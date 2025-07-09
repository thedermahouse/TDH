import React from "react";

export default function VideoSection({ section }) {
  // Function to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full max-w-fu  mx-auto p-4">
      <div className="relative pt-[56.25%] w-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={getEmbedUrl(section?.videoURL)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
