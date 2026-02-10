"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);

  useEffect(() => {
    const env = localStorage.getItem("convex_env") || "dev";
    
    const convexUrl = env === "prod" 
      ? process.env.NEXT_PUBLIC_CONVEX_URL_PROD!
      : process.env.NEXT_PUBLIC_CONVEX_URL!;

    const convexClient = new ConvexReactClient(convexUrl);
    setClient(convexClient);
  }, []);

  if (!client) {
    return <div className="min-h-screen bg-black" />;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}