import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import md5 from "md5";

const check_cache = async (url) => {
  var cache_data = localStorage.getItem("cache") || "{}";
  url = md5(url);

  if (cache_data) {
    cache_data = JSON.parse(cache_data);
    if (cache_data[url]) {
      return cache_data[url];
    }
  }
  return { data: null };
};

const write_cache = async (url, data, expiry) => {
  url = md5(url);
  var cache_data = localStorage.getItem("cache") || "{}";

  cache_data = JSON.parse(cache_data);

  localStorage.setItem(
    "cache",
    JSON.stringify({ ...cache_data, [url]: { data, expiry } })
  );
};

const get_data = async (url, cache) => {
  if (!url) {
    throw new Error("Invalid URL");
  }
  if (cache) {
    var { data, expiry } = await check_cache(url);
    if (data && expiry) {
      if (Date.now() < expiry) {
        return { data };
      }
    }
  }
  const { data: fetched_data } = await axios.get(url, {
    withCredentials: true,
  });
  if (cache) {
    write_cache(url, fetched_data, Date.now() + 1000 * 60 * 1);
  }
  return { data: fetched_data };
};

export const useQuery = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [actionResponse, setActionResponse] = useState(null);

  const { cache, enabled = true } = options;

  const isLoading = loading || (data === null && error === null);

  const query = useCallback(async () => {
    if (!url || !enabled) {
      setError(new Error("Invalid URL or disabled query"));
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await get_data(url, !!cache);
      setData(data);
      setError(null);
    } catch (e) {
      setError({
        message:
          e?.response?.data?.message || e.message || "Something went wrong",
        status: e?.response?.status || 500,
        error: e,
      });
    } finally {
      setIsLoading(false);
    }
  }, [url, cache, enabled]);

  const modifyRequest = useCallback(
    async (url, method, data) => {
      if (!url) {
        throw new Error("Invalid URL");
      }
      try {
        setIsLoading(true);
        const { data: res } = await axios[method || "get"](
          url,
          method === "delete" ? { data } : data,
          {
            withCredentials: true,
          }
        );
        setActionResponse(res);
        query();
        return res;
      } catch (e) {
        const err = {
          message: e?.response?.data?.message || "Something went wrong",
          status: e?.response?.status || 500,
          error: e,
        };
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  const additional_methods = ["del", "put", "patch", "post"].reduce(
    (acc, method) => {
      acc[method] = (data, suffix = "") => {
        suffix = suffix ? "/" + suffix : "";
        return modifyRequest(
          url + suffix,
          method === "del" ? "delete" : method,
          data
        );
      };
      return acc;
    },
    {}
  );

  const { del, put, patch, post } = additional_methods;

  useEffect(() => {
    if (enabled && url) {
      query();
    }
  }, [query, enabled, url]);

  const refetch = useCallback(() => {
    if (enabled && url) {
      query();
    }
  }, [query, enabled]);

  return {
    data,
    actionResponse,
    refetch,
    isLoading,
    error,
    del,
    put,
    patch,
    post,
  };
};
