"use client";

import { ReactNode } from "react";
import { AuthProvider } from "../app/lib/auth-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
