"use client";
import { useEffect, useState } from "react";

export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollTop(window.pageYOffset);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollTop;
}
