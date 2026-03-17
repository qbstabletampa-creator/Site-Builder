/**
 * GA4 analytics utilities.
 *
 * Measurement ID is injected at build time via VITE_GA4_MEASUREMENT_ID.
 * All functions are no-ops when gtag is unavailable (dev without the script, etc.).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/** Track a page view. Called automatically on route change. */
export function trackPageView(path: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}

/** Track a form submission as a GA4 conversion event. */
export function trackFormSubmission(params: {
  role: "athlete" | "coach";
  goals: string[];
}) {
  gtag("event", "generate_lead", {
    event_category: "lead_capture",
    role: params.role,
    goals: params.goals.join(","),
  });
}
