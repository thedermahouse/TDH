export function validateBlogData({ title, slug, description, imageURL }) {
  const errors = {};
  let valid = true;

  // Title validation
  if (title !== undefined) {
    if (title.trim() === "") {
      errors.title = "Title is required";
      valid = false;
    } else if (title.length > 100) {
      errors.title = "Title must be less than 100 characters";
      valid = false;
    }
  }

  // Slug validation
  if (slug !== undefined) {
    if (slug.trim() === "") {
      errors.slug = "Slug is required";
      valid = false;
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      errors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
      valid = false;
    } else if (slug.length > 100) {
      errors.slug = "Slug must be less than 100 characters";
      valid = false;
    }
  }

  // Description validation
  if (description !== undefined) {
    if (description.trim() === "") {
      errors.description = "Description is required";
      valid = false;
    } else if (description.length > 500) {
      errors.description = "Description must be less than 500 characters";
      valid = false;
    }
  }

  // No strict URL validation for imageURL anymore
  if (imageURL !== undefined && imageURL.trim() === "") {
    errors.imageURL = "Image field cannot be empty string";
    valid = false;
  }

  return { valid, errors };
}
