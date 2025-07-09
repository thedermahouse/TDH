import { useEffect, useState } from "react";

export default function useTheme(t) {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme || t);
  }, [theme, t]);

  return { theme, setTheme };
}
