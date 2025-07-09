import { useState, useRef, useEffect } from "react";
import Img from "@/components/misc/Img";
import { TbCopy } from "react-icons/tb";
import { BiDownload, BiSearch, BiPlay, BiPause } from "react-icons/bi";
import { RiExternalLinkLine } from "react-icons/ri";
import Link from "next/link";

const VideoControls = ({ videoRef, isPlaying }) => {
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="btn btn-circle btn-xs btn-ghost absolute top-2 end-2 z-30"
    >
      {isPlaying ? (
        <BiPause className="text-lg" />
      ) : (
        <BiPlay className="text-lg" />
      )}
    </button>
  );
};

const MediaItem = ({ media, url }) => {
  const isVideo = media.filename.match(/\.(mp4|webm|ogg)$/i);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef]);

  return (
    <div className="w-full p-3">
      <div className="w-full relative overflow-hidden min-h-24 flex items-center justify-center border rounded-lg border-gray-600">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              preload="metadata"
              muted
            >
              <source
                src={url}
                type={`video/${media.filename.split(".").pop()}`}
              />
            </video>
            <VideoControls videoRef={videoRef} isPlaying={isPlaying} />
          </div>
        ) : (
          <Img src={url} alt="image" className="rounded-lg" />
        )}

        <div className="opacity-0 hover:opacity-100 absolute z-20 top-0 end-0 start-0 bottom-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="flex items-center justify-center flex-col gap-4">
            <div className="text-white absolute bottom-0 bg-black/50 start-0 end-0">
              <marquee className="text-start text-xs">{media.filename}</marquee>
            </div>

            <div className="absolute top-2 end-14 z-30">
              <div className="join">
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(url);
                    }
                  }}
                  className="btn btn-success btn-xs join-item"
                >
                  <TbCopy className="text-lg" />
                </button>
                <Link
                  href={url}
                  target="_blank"
                  aria-label="Download"
                  className="btn btn-success btn-xs join-item"
                  download
                >
                  <BiDownload className="text-lg" />
                </Link>
                <Link
                  href={url}
                  target="_blank"
                  aria-label="Open in new tab"
                  className="btn btn-accent btn-xs join-item"
                >
                  <RiExternalLinkLine className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
