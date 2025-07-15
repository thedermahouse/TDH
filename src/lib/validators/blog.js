export function validateBlogData({ title, slug, description, imageURL }) {
  const errors = {};
  let valid = true;

  // Validate title only if provided
  if (title !== undefined) {
    if (title.trim() === "") {
      errors.title = "Title is required";
      valid = false;
    } else if (title.length > 100) {
      errors.title = "Title must be less than 100 characters";
      valid = false;
    }
  }

  // Validate slug only if provided
  if (slug !== undefined) {
    if (slug.trim() === "") {
      errors.slug = "Slug is required";
      valid = false;
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      errors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
      valid = false;
    } else if (slug.length > 100) {
      errors.slug = "Slug must be less than 100 characters";
      valid = false;
    }
  }

  // Validate description only if provided
  if (description !== undefined) {
    if (description.trim() === "") {
      errors.description = "Description is required";
      valid = false;
    } else if (description.length > 500) {
      errors.description = "Description must be less than 500 characters";
      valid = false;
    }
  }

  // Validate image URL only if provided
  if (imageURL !== undefined && imageURL.trim() !== "") {
    try {
      new URL(imageURL);
    } catch (e) {
      errors.imageURL = "Invalid URL format";
      valid = false;
    }
  }

  return { valid, errors };
}
