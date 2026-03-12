import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const initValues = { title: '', description: '' };

  const doUpload = async (inputs: Record<string, string>) => {
    const uploadToast = toast.loading('Uploading your milestone...');
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        toast.dismiss(uploadToast);
        return;
      }
      
      const fileResponse = await postFile(file, token);
      await postMedia(fileResponse, inputs, token);
      
      toast.success('Milestone added successfully! 🏆', { id: uploadToast });
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message, { id: uploadToast });
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doUpload, initValues);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">New Milestone</h1>
          <p className="text-gray-500">Capture your progress and keep the momentum going.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative w-full h-64 border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden hover:border-indigo-400 transition-colors bg-gray-50 flex items-center justify-center">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center">
                <span className="text-4xl block mb-2">📸</span>
                <p className="text-sm font-medium text-gray-500">Click to upload media</p>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Title</label>
            <input
              name="title"
              type="text"
              onChange={handleInputChange}
              placeholder="What did you achieve today?"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Notes</label>
            <textarea
              name="description"
              rows={4}
              onChange={handleInputChange}
              placeholder="Add some details about this milestone..."
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Post to Timeline
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;