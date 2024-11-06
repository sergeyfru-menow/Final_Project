// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string | null | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
