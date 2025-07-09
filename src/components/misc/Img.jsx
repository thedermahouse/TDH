"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Img(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const [show, setShow] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "1500px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (inView || props.preload === true) setShow(true);
  }, [inView]);

  return (
    <div ref={ref} className="relative h-full w-full">
      {(props.keepLoading !== undefined || (loading && !error)) && (
        <div
          className={`skeleton h-full w-full ${props.skeleton_class}`}
          style={{
            width: props.width,
            ...(props.style || {}),
          }}
        >
          {props.skeletonItem}
        </div>
      )}
      {!error && !props.keepLoading && show && (
        <picture>
          <img
            {...props}
            alt={props.alt || "preview"}
            className={`${loading ? "hidden" : ""} select-none ${
              props.className || ""
            }`}
            draggable={false}
            style={{
              zIndex: loading ? -100 : 1,
              position: loading ? "absolute" : "relative",
              opacity: loading ? 0 : 1,
              ...(props.style || {}),
            }}
            ref={imgRef}
            onLoad={() => {
              setLoading(false);
            }}
            onError={(e) => {
              setError(true);
            }}
          />
        </picture>
      )}
      {error && (
        <div className="text-error flex ac bg-white px-3 rounded-md h-full w-full">
          image not avilable {error}
        </div>
      )}
    </div>
  );
}
