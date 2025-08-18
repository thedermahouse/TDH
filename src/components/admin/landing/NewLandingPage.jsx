import React from 'react';
import { useDialogProvider } from '@/context/DialogProvider';

export default function NewLandingPage({ post }) {
  const dialog = useDialogProvider();

  const open = () => {
    dialog({
      open: true,
      title: 'Create Landing Page',
      form: [
  { name: 'title', type: 'text', label: 'Title', required: true },
  { name: 'description', type: 'textarea', label: 'Description' },
  { name: 'slug', type: 'text', label: 'Slug (optional)' },
  { name: 'metaTitle', type: 'text', label: 'Meta Title' },
  { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
  { name: 'bannerUrl', type: 'text', label: 'Banner Image URL' },
  { name: 'ctaText', type: 'text', label: 'Call To Action Text' },
  { name: 'ctaLink', type: 'text', label: 'Call To Action Link' },
  { name: 'published', type: 'checkbox', label: 'Published' },
],
      onSubmit: async (values) => {
        await post(values);
      }
    });
  };

  return (
    <button onClick={open} className="btn btn-primary btn-sm">
      + New Landing Page
    </button>
  );
}
    