import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

export default function ContentEditor({ section, setSection }) {
  return (
    <div className="border rounded-md p-3 border-gray-500">
      <div className="flex justify-between items-center px-5">
        <div>
          <h1 className="font-bold">Content Section</h1>
        </div>
        <div>
          <button
            className="btn btn-square btn-sm btn-error"
            onClick={() => {
              setSection(() => undefined);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="w-full py-4 grid gap-3 px-4">
        <div className="w-full">
          <input
            placeholder="Title"
            className="input w-full"
            value={section?.title || ""}
            onChange={({ target }) => {
              setSection((prevState) => ({
                ...prevState,
                title: target.value,
              }));
            }}
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Content"
            className="textarea w-full"
            value={section?.content || ""}
            onChange={({ target }) => {
              setSection((prevState) => ({
                ...prevState,
                content: target.value,
              }));
            }}
          >
            {section.content}
          </textarea>
        </div>
      </div>
    </div>
  );
}
