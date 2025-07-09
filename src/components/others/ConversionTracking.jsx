"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/thank-you" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16936340985/LqDMCIXGzLYaEPmb8Is_",
      });
    }
  }, [pathname]);

  return null;
}
