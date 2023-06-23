import type { languages } from "./types";

export const PROD = process.env.NODE_ENV === "production";
export const nexusPort = PROD ? Number(process.env.NEXUS_PORT) : 4000;
export const typescriptPort = PROD ? Number(process.env.TYPESCRIPT_PORT) : 4001;
export const pythonPort = PROD ? Number(process.env.PYTHON_PORT) : 4002;
export const rubyPort = PROD ? Number(process.env.RUBY_PORT) : 4003;
export const goPort = PROD ? Number(process.env.GO_PORT) : 4004;

export const langInfo: Record<languages, number> = {
  TypeScript: typescriptPort,
  Python: pythonPort,
  Ruby: rubyPort,
  Go: goPort,
};

export const getRoutes = ["ping"];
export const postRoutes = ["normalize"];
