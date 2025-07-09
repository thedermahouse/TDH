"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      // Fire PageView for both pixel IDs
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}
