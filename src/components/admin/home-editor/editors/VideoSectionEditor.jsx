import React from "react";

export default function VideoSectionEditor({ section, setSection }) {
  return (
    <div className="w-full flex flex-col gap-2 ">
      <h1>Video Section</h1>
      <div className="w-full">
        <input
          value={section?.videoURL}
          type="text"
          onChange={(e) => {
            setSection((p) => {
              p.videoURL = e.target.value;
              return p;
            });
          }}
          className="input input-sm w-full"
          placeholder="Video URL"
        />
      </div>
    </div>
  );
}
