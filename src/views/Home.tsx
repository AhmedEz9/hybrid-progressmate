import { useState } from 'react';
import { useMedia } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/ContextHooks';
import MediaRow from '../components/MediaRow';
import { Link } from 'react-router-dom';

const Home = () => {
  const { mediaArray, loading } = useMedia();
  const { user } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');

  const myMedia = mediaArray?.filter((item) => {
    const isMyPost = item.user_id === user?.user_id;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isMyPost && matchesSearch;
  });

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Progress Timeline</h1>
        <p className="mt-3 text-lg text-gray-500">Track your journey, one step at a time.</p>
      </div>

      {!user ? (
        <div className="text-center py-12 bg-indigo-50 rounded-3xl border border-indigo-100 max-w-2xl mx-auto mt-10">
          <span className="text-5xl block mb-4">👋</span>
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">Welcome to ProgressMate</h2>
          <p className="text-indigo-700 mb-6">Log in or create an account to view and track your personal progress.</p>
          <Link to="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search your milestones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* The Loading Spinner Logic */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
              <p className="text-indigo-600 font-bold animate-pulse">Loading your timeline...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myMedia?.map((item) => (
                <MediaRow key={item.media_id} item={item} />
              ))}
              
              {/* If NO posts at all */}
              {mediaArray?.filter(item => item.user_id === user?.user_id).length === 0 && (
                <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 mt-4">
                  <span className="text-6xl block mb-4">🌱</span>
                  <h3 className="text-xl font-bold text-gray-900">Your timeline is empty</h3>
                  <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">You haven't uploaded any progress yet. Start tracking your journey today!</p>
                  <Link to="/upload" className="text-indigo-600 bg-indigo-50 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-colors inline-block">
                    + Add your first milestone
                  </Link>
                </div>
              )}

              {/* If search doesn't exist */}
              {myMedia?.length === 0 && searchTerm !== '' && mediaArray?.filter(item => item.user_id === user?.user_id).length > 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No milestones found matching "{searchTerm}".
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;