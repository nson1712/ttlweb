"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./context/auth-context";
import { SearchProvider } from "./context/search-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthProvider>
  );
}
