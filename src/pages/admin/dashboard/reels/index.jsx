"use client";
import { useEffect, useState } from "react";
import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";

export default function ReelsAdmin() {
  const [reels, setReels] = useState([]);
  const [form, setForm] = useState({ videoUrl: "", link: "" });

  const loadReels = async () => {
    const res = await fetch("/api/reels");
    const data = await res.json();
    setReels(data.data || []);
  };

  const addReel = async () => {
    if (!form.videoUrl || !form.link) return alert("Fill all fields");
    await fetch("/api/reels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ videoUrl: "", link: "" });
    loadReels();
  };

  const deleteReel = async (id) => {
    if (!confirm("Delete this reel?")) return;
    await fetch(`/api/reels/${id}`, { method: "DELETE" });
    loadReels();
  };

  useEffect(() => {
    loadReels();
  }, []);

  return (
    <AdminPanelWrapper>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Manage Reels</h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            placeholder="Instagram Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="input input-bordered w-full mb-2"
          />
          <button onClick={addReel} className="btn btn-info w-full">
            Add Reel
          </button>
        </div>

        <div className="space-y-3">
          {reels.map((r) => (
            <div
              key={r.id}
              className="flex justify-between bg-gray-900 p-3 rounded-lg items-center"
            >
              <div>
                <p className="text-sm text-gray-300 truncate w-64">
                  🎥 {r.videoUrl}
                </p>
                <a
                  href={r.link}
                  target="_blank"
                  className="text-blue-400 text-xs underline"
                >
                  {r.link}
                </a>
              </div>
              <button
                onClick={() => deleteReel(r.id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminPanelWrapper>
  );
}
