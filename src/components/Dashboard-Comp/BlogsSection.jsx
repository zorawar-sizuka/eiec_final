"use client";
import React, { useState, useEffect } from "react";
import { EditorProvider, FloatingMenu, BubbleMenu, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 border-gray-200">
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        Bold
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded text-sm font-semibold italic ${editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        Italic
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-2 py-1 rounded text-sm font-semibold line-through ${editor.isActive('strike') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        Strike
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
        className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        H2
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}
        className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        H3
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
        className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        Bullet List
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }}
        className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
      >
        Ordered List
      </button>
    </div>
  );
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    tags: "",
    content: "",
    file: null, // For cover image
  });
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/resources/blogs");
      if (res.ok) {
        setBlogs(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if slug isn't manually edited yet
      ...(name === "title" && !prev.slug.trim() ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {}),
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const extensions = [
    StarterKit,
    Link.configure({
      openOnClick: false,
    }),
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setErrorMsg("");

    try {
      let imageUrl = "";

      // 1. Upload Cover Image to Supabase if provided
      if (formData.file) {
        const fileData = new FormData();
        fileData.append("file", formData.file);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: fileData,
        });
        const uploadJson = await uploadRes.json();
        
        if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");
        imageUrl = uploadJson.url;
      } else {
         throw new Error("Cover image is required");
      }

      // 2. Save Blog to Database
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);

      const dbRes = await fetch("/api/resources/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          tags: tagsArray,
          content: formData.content,
          imageUrl,
          isPublished: true, 
        }),
      });

      const dbJson = await dbRes.json();
      if (!dbRes.ok) throw new Error(dbJson.error || "Database save failed");

      // Success! Reset form and refresh list
      setFormData({ title: "", slug: "", description: "", tags: "", content: "", file: null });
       // Reset file input manually
      const fileInput = document.getElementById("coverImage");
      if(fileInput) fileInput.value = "";
      
      fetchBlogs();
      alert("Blog created successfully!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/resources/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch(err) {
      console.error(err);
    }
  }


  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">Manage Blogs</h1>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Create New Blog</h2>
        {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{errorMsg}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Guide to IELTS" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., guide-to-ielts" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (For Card, Max 150 chars)</label>
             <textarea required name="description" value={formData.description} onChange={handleChange} maxLength={150} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20" placeholder="A brief summary..." />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Comma separated)</label>
               <input required type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., UK, Admissions, Exams" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image Header (avif, jpg, png)</label>
               <input required type="file" id="coverImage" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-lg bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer" />
            </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Body (Rich Text)</label>
              <div className="bg-white rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <EditorProvider
                    slotBefore={<MenuBar />}
                    extensions={extensions}
                    content={formData.content}
                    immediatelyRender={false}
                    onUpdate={({ editor }) => {
                      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
                    }}
                    editorProps={{
                      attributes: {
                         class: 'prose prose-sm sm:prose-base focus:outline-none p-4 min-h-[200px] max-h-[500px] overflow-y-auto',
                      }
                    }}
                  />
              </div>
          </div>

          <button 
             disabled={uploading} 
             type="submit" 
             className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            {uploading ? "Uploading & Saving..." : "Publish Blog"}
          </button>
        </form>
      </div>

      {/* LIST EXISTING BLOGS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing Blogs</h2>
        {loading ? (
            <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
            <p className="text-gray-500">No blogs found.</p>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                {blogs.map(blog => (
                    <div key={blog.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <img src={blog.imageUrl} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                                <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                                <p className="text-sm text-gray-500">/{blog.slug}</p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex gap-2">
                             <a href={`/resources/${blog.id}`} target="_blank" className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md">View</a>
                             <button onClick={() => handleDelete(blog.id)} className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-md">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
