// typescript delcarations file
/// <reference types="vite/client"/>

// for import.meta.env
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}