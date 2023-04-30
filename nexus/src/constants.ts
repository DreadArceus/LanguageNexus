export const __prod__ = process.env.NODE_ENV === "production";
export const nexusPort = __prod__ ? process.env.NEXUS_PORT : 4000;
export const typescriptPort = __prod__ ? process.env.TYPESCRIPT_PORT : 4001;
