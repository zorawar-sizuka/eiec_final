"use client";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    iconName: "FileText",
    themeName: "blue",
    file: null, // For PDF/Excel
  });
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const themeOptions = ["blue", "green", "sky", "purple", "orange", "red", "slate"];
  const iconOptions = ["FileText", "CheckSquare", "GraduationCap", "BookOpen", "Briefcase", "Globe", "HelpCircle"];

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/resources/materials");
      if (res.ok) {
        setMaterials(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setErrorMsg("");

    try {
      let fileUrl = "";

      // 1. Upload File to Supabase
      if (formData.file) {
        const fileData = new FormData();
        fileData.append("file", formData.file);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: fileData,
        });
        const uploadJson = await uploadRes.json();
        
        if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");
        fileUrl = uploadJson.url;
      } else {
         throw new Error("File attachment is required");
      }

      // 2. Save Material to Database
      const dbRes = await fetch("/api/resources/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          iconName: formData.iconName,
          themeName: formData.themeName,
          fileUrl,
          isPublished: true, 
        }),
      });

      const dbJson = await dbRes.json();
      if (!dbRes.ok) throw new Error(dbJson.error || "Database save failed");

      // Success! Reset form and refresh list
      setFormData({ title: "", description: "", iconName: "FileText", themeName: "blue", file: null });
      const fileInput = document.getElementById("materialFile");
      if(fileInput) fileInput.value = "";
      
      fetchMaterials();
      alert("Study Material created successfully!");
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
      await fetch(`/api/resources/materials/${id}`, { method: "DELETE" });
      fetchMaterials();
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">Manage Study Materials</h1>
      </div>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New Downloadable Guide</h2>
        {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{errorMsg}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., The Ultimate SOP Guide" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Upload File (PDF, Excel, etc)</label>
               <input required type="file" id="materialFile" onChange={handleFileChange} className="w-full p-2 border rounded-lg bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Description (Max 150 chars)</label>
             <textarea required name="description" value={formData.description} onChange={handleChange} maxLength={150} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20" placeholder="A brief summary of what this guide contains..." />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Card Theme Color</label>
                   <div className="flex flex-wrap gap-2">
                     {themeOptions.map(theme => (
                         <div 
                           key={theme}
                           onClick={() => setFormData(prev => ({ ...prev, themeName: theme }))}
                           className={`px-4 py-2 border rounded-lg cursor-pointer capitalize text-sm font-medium transition-colors ${formData.themeName === theme ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-gray-50'}`}
                         >
                            {theme}
                         </div>
                     ))}
                   </div>
               </div>
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Display Icon</label>
                   <div className="flex flex-wrap gap-2">
                     {iconOptions.map(icon => {
                         const IconComp = LucideIcons[icon];
                         return (
                             <div 
                               key={icon}
                               onClick={() => setFormData(prev => ({ ...prev, iconName: icon }))}
                               title={icon}
                               className={`p-3 border rounded-lg cursor-pointer transition-colors ${formData.iconName === icon ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white hover:bg-gray-50 text-gray-600'}`}
                             >
                                <IconComp className="w-5 h-5" />
                             </div>
                         )
                     })}
                   </div>
               </div>
          </div>

          <button 
             disabled={uploading} 
             type="submit" 
             className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            {uploading ? "Uploading & Saving..." : "Publish Material"}
          </button>
        </form>
      </div>

      {/* LIST EXISTING MATERIALS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Existing Materials</h2>
        {loading ? (
            <p className="text-gray-500">Loading materials...</p>
        ) : materials.length === 0 ? (
            <p className="text-gray-500">No materials found.</p>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                {materials.map(mat => {
                    const IconComp = LucideIcons[mat.iconName] || LucideIcons.File;
                    return (
                    <div key={mat.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                                <IconComp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{mat.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-0.5 bg-gray-200 rounded text-gray-700 capitalize">Theme: {mat.themeName}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex gap-2">
                             <a href={mat.fileUrl} target="_blank" download className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md">Download</a>
                             <button onClick={() => handleDelete(mat.id)} className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-md">Delete</button>
                        </div>
                    </div>
                )})}
            </div>
        )}
      </div>
    </div>
  );
}
