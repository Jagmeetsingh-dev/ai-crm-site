/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Webezio Labs API key — used for lead submissions and analytics. */
  readonly VITE_WEBEZIO_API_KEY?: string;
  /** Optional override for the Webezio submissions endpoint. */
  readonly VITE_WEBEZIO_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
