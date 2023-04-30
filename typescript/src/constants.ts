export const __prod__ = process.env.NODE_ENV === "production";
export const port = __prod__ ? process.env.PORT : 4001;
