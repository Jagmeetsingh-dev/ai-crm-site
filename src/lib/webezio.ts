/**
 * Webezio Labs — form submissions + page-view analytics.
 *
 * Lead forms POST to the submissions API; page views are sent via track.js.
 * The key is read from the environment (see `.env.example`) so it never lands
 * in source control. Set `VITE_WEBEZIO_API_KEY` in your local `.env`.
 */

const API_URL =
  import.meta.env.VITE_WEBEZIO_API_URL?.trim() ||
  "https://console.webiziolabs.com/api/v1/submissions";

const API_KEY = import.meta.env.VITE_WEBEZIO_API_KEY?.trim();

const TRACK_SRC = "https://console.webiziolabs.com/track.js";

/** Allowed submission categories per the Webezio API. */
export type WebezioFormType =
  | "contact"
  | "booking"
  | "quote"
  | "newsletter"
  | "membership"
  | "order";

/** True once an API key has been provided via the environment. */
export const isWebezioConfigured = Boolean(API_KEY);

/**
 * Send a submission to the Webezio Labs inbox / CRM. Throws on a missing key
 * or a non-2xx response so callers can surface an error state to the user.
 */
export async function submitToWebezio(
  formType: WebezioFormType,
  data: Record<string, unknown>,
  sourceUrl: string = typeof window !== "undefined" ? window.location.pathname : "",
): Promise<void> {
  if (!API_KEY) {
    throw new Error(
      "Webezio is not configured — set VITE_WEBEZIO_API_KEY in your .env file.",
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ form_type: formType, data, source_url: sourceUrl }),
  });

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}

/**
 * Inject the Webezio analytics tracker once. Safe to call on every mount: it
 * no-ops when the key is missing or the script tag is already present.
 */
export function loadWebezioAnalytics(): void {
  if (!API_KEY || typeof document === "undefined") return;
  if (document.querySelector("script[data-webezio-analytics]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = TRACK_SRC;
  script.dataset.key = API_KEY;
  script.dataset.webezioAnalytics = "true";
  document.body.appendChild(script);
}
