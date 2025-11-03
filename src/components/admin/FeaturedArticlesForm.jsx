import React, { useState } from "react";

export default function FeaturedArticlesForm({ article, onSuccess }) {
  const [form, setForm] = useState(
    article || {
      title: "",
      imageURL: "",
      articleURL: "",
      date: "",
      isPublished: true,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = article ? "PUT" : "POST";

    const res = await fetch("/api/featured-articles", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSuccess && onSuccess();
      alert(article ? "Article updated!" : "Article added!");
    } else {
      alert("Error saving article");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        name="imageURL"
        placeholder="Image URL"
        value={form.imageURL}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        name="articleURL"
        placeholder="Article URL"
        value={form.articleURL}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date ? form.date.split("T")[0] : ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        Published
      </label>

      <button type="submit" className="btn btn-primary w-full">
        {article ? "Update Article" : "Add Article"}
      </button>
    </form>
  );
}
