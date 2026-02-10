import { ConvexHttpClient } from "convex/browser";

export const convexClients = {
  dev: new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL_DEV!),
  prod: new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL_PROD!),
};

export const getConvexClient = (env: "dev" | "prod") => {
  return convexClients[env];
};