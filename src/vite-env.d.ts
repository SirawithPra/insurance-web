/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_URL: string;
  readonly VITE_ENABLE_COMMENTS: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_DEFAULT_OG_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
