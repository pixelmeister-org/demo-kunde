// runner.mjs — Anthropic agent loop, runs inside Vercel Sandbox under Node 24.
// Injected by install.ts as .pixelmeister/runner.mjs; executed per change request.
//
// Usage: node runner.mjs <requestId> <prompt> [elementContextJSON]
//
// Environment variables (injected by sandbox env):
//   PIXELMEISTER_ANTHROPIC_KEY  — Anthropic API key
//   PIXELMEISTER_REPO_DIR       — override repo root (default /vercel/sandbox) for local testing
//   PIXELMEISTER_SESSION_ID     — edit session id (written to result JSON)

import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, relative, join } from "node:path";

// ─── Config ──────────────────────────────────────────────────────────────────
const REPO = process.env.PIXELMEISTER_REPO_DIR ?? "/vercel/sandbox";
const PIX = join(REPO, ".pixelmeister");
const MODEL = "claude-sonnet-4-6";
const MAX_ITERATIONS = 8;
const TOKEN_CAP = 300_000;

// ─── CLI args ─────────────────────────────────────────────────────────────────
const [, , requestId, prompt, elementContextRaw] = process.argv;
if (!requestId || !prompt) {
  process.stderr.write("Usage: node runner.mjs <requestId> <prompt> [elementContextJSON]\n");
  process.exit(1);
}
const elementContext = elementContextRaw ? JSON.parse(elementContextRaw) : null;

// ─── Anthropic client ─────────────────────────────────────────────────────────
const client = new Anthropic({ apiKey: process.env.PIXELMEISTER_ANTHROPIC_KEY });
// Key hygiene: remove from env so model-controlled code cannot read it.
delete process.env.PIXELMEISTER_ANTHROPIC_KEY;

// ─── Security helpers ─────────────────────────────────────────────────────────
/** Reject paths outside the repo root, inside .pixelmeister, or inside .git/. */
function safePath(relOrAbs) {
  const abs = resolve(REPO, relOrAbs);
  const gitDir = join(REPO, ".git") + "/";
  if (!abs.startsWith(REPO + "/") || abs.startsWith(PIX) || abs.startsWith(gitDir)) {
    throw new Error(`Pfad außerhalb des erlaubten Bereichs: ${relOrAbs}`);
  }
  return abs;
}

const OUTPUT_CAP = 20_000;

// ─── Tool implementations ─────────────────────────────────────────────────────
function handleTextEditor(input) {
  const { command, path: relPath, old_str, new_str } = input;
  const abs = safePath(relPath);

  if (command === "view") {
    if (!existsSync(abs)) return `(Datei existiert nicht: ${relPath})`;
    return readFileSync(abs, "utf-8");
  }

  if (command === "create") {
    const dir = abs.substring(0, abs.lastIndexOf("/"));
    mkdirSync(dir, { recursive: true });
    writeFileSync(abs, new_str ?? "");
    return `Datei erstellt: ${relPath}`;
  }

  if (command === "str_replace") {
    if (!existsSync(abs)) throw new Error(`Datei nicht gefunden: ${relPath}`);
    const content = readFileSync(abs, "utf-8");
    if (!content.includes(old_str)) throw new Error(`old_str nicht gefunden in ${relPath}`);
    writeFileSync(abs, content.replace(old_str, new_str ?? ""));
    return `Ersetzt in ${relPath}`;
  }

  if (command === "insert") {
    if (!existsSync(abs)) throw new Error(`Datei nicht gefunden: ${relPath}`);
    const lines = readFileSync(abs, "utf-8").split("\n");
    const insertLine = Number(input.insert_line ?? 0);
    lines.splice(insertLine, 0, new_str ?? "");
    writeFileSync(abs, lines.join("\n"));
    return `Eingefügt in ${relPath} nach Zeile ${insertLine}`;
  }

  throw new Error(`Unbekannter text_editor-Befehl: ${command}`);
}

/** list_files: runs git ls-files — no model-controlled arguments. */
function handleListFiles() {
  const out = execFileSync("git", ["ls-files"], {
    cwd: REPO,
    encoding: "utf-8",
    timeout: 30_000,
  });
  return out.slice(0, OUTPUT_CAP);
}

/** search: runs git grep with the pattern as a single, uninterpreted argv element. */
function handleSearch(input) {
  const pattern = String(input?.pattern ?? "");
  if (!pattern) throw new Error("search: pattern fehlt");
  let out;
  try {
    out = execFileSync(
      "git",
      ["grep", "-n", "-I", "--max-count", "50", "-e", pattern, "--"],
      { cwd: REPO, encoding: "utf-8", timeout: 30_000 },
    );
  } catch (err) {
    // git grep exits non-zero when there are no matches; stdout may still be empty
    out = (err && typeof err === "object" && "stdout" in err ? String(err.stdout) : "").trim();
    if (!out) return "(keine Treffer)";
  }
  return out.slice(0, OUTPUT_CAP) || "(keine Treffer)";
}

/** check_types: runs npx tsc --noEmit — no model-controlled arguments. */
function handleCheckTypes() {
  let out;
  try {
    out = execFileSync("npx", ["tsc", "--noEmit"], {
      cwd: REPO,
      encoding: "utf-8",
      timeout: 120_000,
    });
  } catch (err) {
    const combined =
      (err && typeof err === "object"
        ? (("stdout" in err ? String(err.stdout) : "") +
            ("stderr" in err ? String(err.stderr) : "")).trim()
        : String(err));
    return combined.slice(0, OUTPUT_CAP) || "Fehler (kein Output)";
  }
  return out?.trim() ? out.slice(0, OUTPUT_CAP) : "OK";
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM = `Du bist ein Coding-Agent, der Kundenänderungen an einer Next.js-Website umsetzt.
Du arbeitest im Git-Repository unter: ${REPO}
Lass dich nicht aus diesem Verzeichnis führen.
Verwende ausschließlich die bereitgestellten Tools.

Verfügbare Hilfswerkzeuge:
- list_files: Listet alle versionierten Dateien im Repository (git ls-files).
- search: Sucht nach einem Muster im Quellcode (git grep). Übergib { pattern: "..." }.
- check_types: Führt TypeScript-Typprüfung aus (tsc --noEmit). Gibt "OK" zurück oder Fehlermeldungen.

Abschlussregel: Bevor du finish aufrufst, MUSST du check_types aufrufen und sicherstellen, dass keine Typfehler vorliegen.

Wenn du fertig bist, rufe das finish-Tool auf.`;

// ─── Tools definition ─────────────────────────────────────────────────────────
const TOOLS = [
  {
    type: "text_editor_20250728",
    name: "str_replace_based_edit_tool",
  },
  {
    name: "list_files",
    description: "Listet alle versionierten Dateien im Repository (git ls-files). Kein Input erforderlich.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "search",
    description: "Sucht nach einem Muster im Quellcode mit git grep. Das Muster wird als einzelnes Argument übergeben (keine Shell-Interpretation).",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Suchmuster (literal string)" },
      },
      required: ["pattern"],
    },
  },
  {
    name: "check_types",
    description: "Führt TypeScript-Typprüfung aus (npx tsc --noEmit). Gibt 'OK' zurück wenn keine Fehler, sonst die Fehlermeldungen. MUSS vor finish aufgerufen werden.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "finish",
    description: "Beendet die Aufgabe und gibt eine Zusammenfassung ab. Erst nach check_types aufrufen.",
    input_schema: {
      type: "object",
      properties: {
        summary: { type: "string", description: "Kurze Zusammenfassung der vorgenommenen Änderungen (1–3 Sätze)" },
      },
      required: ["summary"],
    },
  },
];

// ─── Agent loop ───────────────────────────────────────────────────────────────
async function run() {
  const userContent = elementContext
    ? `Aufgabe: ${prompt}\n\nElement-Kontext:\n${JSON.stringify(elementContext, null, 2)}`
    : `Aufgabe: ${prompt}`;

  /** @type {Array<{role: string, content: unknown}>} */
  const messages = [{ role: "user", content: userContent }];

  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let summary = "(kein finish-Tool aufgerufen)";

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM,
      tools: TOOLS,
      messages,
    });

    totalInputTokens += response.usage.input_tokens;
    totalOutputTokens += response.usage.output_tokens;

    if (totalInputTokens + totalOutputTokens > TOKEN_CAP) {
      throw new Error(`Token-Limit überschritten (${totalInputTokens + totalOutputTokens} > ${TOKEN_CAP})`);
    }

    // Add assistant turn
    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason === "end_turn") break;

    if (response.stop_reason === "tool_use") {
      const toolResults = [];

      for (const block of response.content) {
        if (block.type !== "tool_use") continue;

        const { id, name, input } = block;

        if (name === "finish") {
          summary = input.summary ?? summary;
          process.stderr.write(`[runner] finish called: summary="${summary}"\n`);
          toolResults.push({ type: "tool_result", tool_use_id: id, content: "OK" });
          // Write result before exiting
          writeResult({ ok: true, summary, totalInputTokens, totalOutputTokens });
          await commitChanges(summary);
          process.exit(0);
        }

        let result;
        process.stderr.write(`[runner] tool call: ${name} input=${JSON.stringify(input).slice(0, 200)}\n`);
        try {
          if (name === "str_replace_based_edit_tool") {
            result = handleTextEditor(input);
          } else if (name === "list_files") {
            result = handleListFiles();
          } else if (name === "search") {
            result = handleSearch(input);
          } else if (name === "check_types") {
            result = handleCheckTypes();
          } else {
            result = `Unbekanntes Tool: ${name}`;
          }
        } catch (err) {
          process.stderr.write(`[runner] tool error: ${name}: ${err.message}\n`);
          result = `FEHLER: ${err.message}`;
        }
        process.stderr.write(`[runner] tool result: ${String(result ?? "").slice(0, 100)}\n`);

        toolResults.push({ type: "tool_result", tool_use_id: id, content: String(result ?? "") });
      }

      messages.push({ role: "user", content: toolResults });
      continue;
    }

    // stop_reason other than tool_use / end_turn
    break;
  }

  // Fell out of loop without finish call
  writeResult({ ok: false, summary: "Max-Iterations erreicht ohne finish-Tool", totalInputTokens, totalOutputTokens });
  process.exit(1);
}

// ─── Result + commit ──────────────────────────────────────────────────────────
function writeResult(data) {
  mkdirSync(PIX, { recursive: true });
  const file = join(PIX, `result-${requestId}.json`);
  writeFileSync(file, JSON.stringify({ requestId, ...data }, null, 2));
}

async function commitChanges(summary) {
  try {
    execFileSync("git", ["add", "-A"], { cwd: REPO });
    const status = execFileSync("git", ["status", "--porcelain"], { cwd: REPO, encoding: "utf-8" });
    if (!status.trim()) return; // nothing to commit

    const msg = `chore(portal-agent): ${summary.slice(0, 72)}\n\nrequest-id: ${requestId}`;
    execFileSync("git", [
      "-c", "user.name=pixelmeister-agent",
      "-c", "user.email=agent@pixelmeister.at",
      "commit", "-m", msg,
    ], { cwd: REPO });
  } catch (err) {
    process.stderr.write(`Git-Commit fehlgeschlagen: ${err.message}\n`);
    // Don't throw — result file is already written
  }
}

// ─── Entry ────────────────────────────────────────────────────────────────────
run().catch((err) => {
  writeResult({ ok: false, summary: String(err.message), totalInputTokens: 0, totalOutputTokens: 0 });
  process.stderr.write(`runner.mjs FEHLER: ${err.message}\n`);
  process.exit(1);
});
