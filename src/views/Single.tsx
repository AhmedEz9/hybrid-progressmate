import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { MediaItem } from '../types/DBTypes';
import { useMedia } from '../hooks/apiHooks';
import toast from 'react-hot-toast';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteMedia, putMedia } = useMedia(); 
  
  const item: MediaItem = location.state?.item;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item?.title || '');
  const [editDescription, setEditDescription] = useState(item?.description || '');

  if (!item) {
    return <Navigate to="/" />;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this progress post?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found");

      await deleteMedia(item.media_id, token);
      toast.success("Post deleted successfully! 🗑️");
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Could not delete the post. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found");

      await putMedia(item.media_id, { title: editTitle, description: editDescription }, token);
      
      item.title = editTitle;
      item.description = editDescription;
      
      setIsEditing(false);
      toast.success("Post updated successfully! ✨");
    } catch (error) {
      console.error("Failed to update:", error);
      toast.error("Could not update the post. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link 
        to="/" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-bold mb-6 transition-colors bg-indigo-50 px-4 py-2 rounded-xl"
      >
        ← Back to Timeline
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="w-full bg-gray-900 flex justify-center items-center">
          {item.media_type?.includes('video') ? (
            <video controls src={item.filename} className="w-full max-h-[600px] object-contain" />
          ) : (
            <img src={item.filename} alt={item.title} className="w-full max-h-[600px] object-contain" />
          )}
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 border-b border-gray-100 pb-6">
            
            {isEditing ? (
              <input 
                type="text" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none w-full rounded-xl px-4 py-2"
              />
            ) : (
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {item.title}
              </h1>
            )}
            
            <div className="flex items-center gap-3">
              {!isEditing && (
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 py-1.5 px-4 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">
                  📅 {new Date(item.created_at).toLocaleDateString('fi-FI')}
                </span>
              )}
              
              {isEditing ? (
                <>
                  <button onClick={handleUpdate} className="bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 py-1.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-colors">💾 Save</button>
                  <button onClick={() => { setIsEditing(false); setEditTitle(item.title); setEditDescription(item.description); }} className="bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 py-1.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-colors">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100 py-1.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-colors">✏️ Edit</button>
                  <button onClick={handleDelete} className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 py-1.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-colors">🗑️ Delete</button>
                </>
              )}
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Progress Notes</h3>
            
            {isEditing ? (
              <textarea 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={5}
                className="w-full text-lg text-gray-700 leading-relaxed border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none rounded-xl p-4"
              />
            ) : (
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;