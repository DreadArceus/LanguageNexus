import { languages } from "./types";

export const __prod__ = process.env.NODE_ENV === "production";
export const nexusPort = __prod__ ? Number(process.env.NEXUS_PORT) : 4000;
export const typescriptPort = __prod__
  ? Number(process.env.TYPESCRIPT_PORT)
  : 4001;
export const pythonPort = __prod__ ? Number(process.env.PYTHON_PORT) : 4002;
export const rubyPort = __prod__ ? Number(process.env.RUBY_PORT) : 4003;

export const langInfo: Record<languages, number> = {
  TypeScript: typescriptPort,
  Python: pythonPort,
  Ruby: rubyPort,
};
