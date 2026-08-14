"use client";

import { useEffect } from "react";
import { API_BASE } from "../lib/api";

function getSessionId(): string {
  const key = "riviu-session";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

/**
 * Tracker analytics tự xây: pageview, thời gian trên trang,
 * dwell time từng section (data-section) và click CTA (data-track).
 * Gửi batch bằng sendBeacon dạng text/plain để không bị chặn khi rời trang.
 */
export function Tracker() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    void fetch(`${API_BASE}/api/track/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        path,
        referrer: document.referrer || undefined,
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
      }),
    }).catch(() => {});

    // --- thời gian trên trang ---
    let visibleSince: number | null =
      document.visibilityState === "visible" ? Date.now() : null;
    let accumulatedMs = 0;

    // --- dwell time từng section ---
    const dwell = new Map<string, number>();
    const clicks = new Map<string, number>();
    const activeSince = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section;
          if (!id) continue;
          if (entry.isIntersecting) {
            activeSince.set(id, now);
          } else {
            const since = activeSince.get(id);
            if (since) {
              dwell.set(id, (dwell.get(id) ?? 0) + (now - since));
              activeSince.delete(id);
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    const observeSections = () => {
      document
        .querySelectorAll<HTMLElement>("[data-section]")
        .forEach((el) => observer.observe(el));
    };
    // chờ nội dung render (Puck hoặc mặc định)
    const observeTimer = window.setTimeout(observeSections, 500);

    // --- click CTA ---
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.(
        "[data-track]",
      );
      if (!target) return;
      const sectionEl = target.closest?.("[data-section]") as
        | HTMLElement
        | null;
      const id = sectionEl?.dataset.section ?? "khac";
      clicks.set(id, (clicks.get(id) ?? 0) + 1);
    };
    document.addEventListener("click", onClick, true);

    const flush = () => {
      const now = Date.now();

      activeSince.forEach((since, id) => {
        dwell.set(id, (dwell.get(id) ?? 0) + (now - since));
        activeSince.set(id, now);
      });
      if (visibleSince !== null) {
        accumulatedMs += now - visibleSince;
        visibleSince = document.visibilityState === "visible" ? now : null;
      }

      const sections = [...new Set([...dwell.keys(), ...clicks.keys()])]
        .map((id) => ({
          sectionId: id,
          dwellMs: Math.round(dwell.get(id) ?? 0),
          clicks: clicks.get(id) ?? 0,
        }))
        .filter((section) => section.dwellMs > 0 || section.clicks > 0);

      if (sections.length > 0) {
        navigator.sendBeacon(
          `${API_BASE}/api/track/sections`,
          JSON.stringify({ sessionId, path, sections }),
        );
        dwell.clear();
        clicks.clear();
      }

      if (accumulatedMs > 500) {
        navigator.sendBeacon(
          `${API_BASE}/api/track/duration`,
          JSON.stringify({
            sessionId,
            path,
            durationMs: Math.round(accumulatedMs),
          }),
        );
        accumulatedMs = 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush();
        visibleSince = null;
      } else {
        visibleSince = Date.now();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);
    const interval = window.setInterval(flush, 15000);

    return () => {
      window.clearTimeout(observeTimer);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", flush);
      observer.disconnect();
    };
  }, []);

  return null;
}
