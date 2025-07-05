"use client";

import AuthProvider from "./AuthProvider";
import RedirectWrapper from "./RedirectWrapper";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RedirectWrapper>{children}</RedirectWrapper>
    </AuthProvider>
  );
}
