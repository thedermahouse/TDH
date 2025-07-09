import { useState, useEffect } from "react";

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({});

  const handleResize = () => {
    const d = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setWindowDimensions(d);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
