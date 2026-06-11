// editkit/edit-kit.tsx — Demo-Kundenrepo
"use client";

import { useEffect } from "react";

function cssPath(element: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName !== "HTML" && parts.length < 8) {
    const tag = current.tagName.toLowerCase();
    const parent: Element | null = current.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName);
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(current) + 1})` : tag);
    current = parent;
  }
  return parts.join(" > ");
}

export function EditKit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PIXELMEISTER_EDIT_MODE !== "1") return;
    const portalOrigin: string | undefined = process.env.NEXT_PUBLIC_PIXELMEISTER_PORTAL_ORIGIN;
    if (!portalOrigin) return;
    const origin: string = portalOrigin;

    const highlight = document.createElement("div");
    highlight.style.cssText =
      "position:fixed;pointer-events:none;border:2px solid #6366f1;border-radius:4px;z-index:99999;transition:all .08s;display:none";
    document.body.appendChild(highlight);

    function targetFor(event: MouseEvent): Element | null {
      const el = event.target as Element | null;
      if (!el || el === document.body || el === document.documentElement) return null;
      return el;
    }

    function onMove(event: MouseEvent) {
      const el = targetFor(event);
      if (!el) return void (highlight.style.display = "none");
      const rect = el.getBoundingClientRect();
      highlight.style.cssText += `;display:block;top:${rect.top - 2}px;left:${rect.left - 2}px;width:${rect.width}px;height:${rect.height}px`;
    }

    function onClick(event: MouseEvent) {
      const el = targetFor(event);
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      window.parent.postMessage(
        {
          source: "pixelmeister-editkit",
          type: "element-selected",
          payload: {
            domPath: cssPath(el),
            editId: el.getAttribute("data-edit-id"),
            text: (el.textContent ?? "").slice(0, 500),
            outerHtml: el.outerHTML.slice(0, 2000),
          },
        },
        origin,
      );
    }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      highlight.remove();
    };
  }, []);

  return null;
}
