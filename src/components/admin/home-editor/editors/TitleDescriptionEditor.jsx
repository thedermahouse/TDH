import React from "react";

export default function TitleDescriptionEditor({ section, setSection }) {
    return (
        <div>
            <div>
                <div className="py-2">
                    <h2 className="font-bold">Title Description Section</h2>
                </div>
            </div>
            <div>
                <div className="space-y-3">
                    <input
                        value={section?.sectionTitle}
                        type="text"
                        onChange={(e) => {
                            setSection((p) => {
                                p.sectionTitle = e.target.value;
                                return p;
                            });
                        }}
                        className="input input-sm w-full"
                        placeholder="Section Title"
                    />
                    <textarea name="" id=""
                        value={section?.sectionDescription}
                        onChange={(e) => {
                            setSection((p) => {
                                p.sectionDescription = e.target.value;
                                return p;
                            });
                        }}
                        className="textarea textarea-sm w-full"
                        placeholder="Section Description"
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
}
