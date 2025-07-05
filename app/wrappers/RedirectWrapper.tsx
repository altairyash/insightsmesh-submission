"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function RedirectWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/signin") {
      router.push("/signin");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
