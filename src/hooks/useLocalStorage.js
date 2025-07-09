import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [value, setValue] = useState("");

  const set = useCallback((key, value) => {
    var val = value;

    try {
      val = JSON.parse(JSON.stringify(value));
    } catch (e) {}

    localStorage.setItem(key, value);
  }, []);

  const get = useCallback((key) => {
    var val = localStorage.getItem(key);

    try {
      val = JSON.parse(val);
    } catch (e) {}

    setValue(val);
  }, []);

  useEffect(() => {
    get(key);
  }, []);

  useEffect(() => {
    if (value) {
      setJSON(key, value);
    }
  }, [value]);

  return [value, set];
}
