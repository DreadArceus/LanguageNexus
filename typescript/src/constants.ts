export const PROD = process.env.NODE_ENV === "production";
export const port = PROD ? Number(process.env.PORT) : 4001;
