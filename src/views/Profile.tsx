import { useUserContext } from '../hooks/ContextHooks';
import { useMedia } from '../hooks/apiHooks';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUserContext();
  const { mediaArray } = useMedia();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const myPosts = mediaArray?.filter(item => item.user_id === user.user_id) || [];
  const postCount = myPosts.length;
  
  const joinedDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('fi-FI') 
    : 'Recently';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white">
        
        {/* Header & Avatar Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-100 pb-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-6xl font-extrabold shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {user.username}
            </h1>
            <p className="text-lg text-gray-500 font-medium mb-4">{user.email}</p>
            <div className="inline-block bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-sm font-bold shadow-sm border border-indigo-100">
              📅 Member since {joinedDate}
            </div>
          </div>
        </div>

        {/* User Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              📊
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Milestones</p>
              <p className="text-4xl font-extrabold text-gray-900">{postCount}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🔥
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Current Status</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {postCount > 0 ? 'Active Achiever' : 'Just Starting'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link 
            to="/upload" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
          >
            + Add New Progress
          </Link>
          <Link 
            to="/logout" 
            className="w-full sm:w-auto px-8 py-4 bg-red-50 text-red-600 font-bold rounded-xl shadow-sm border border-red-100 hover:bg-red-100 hover:text-red-700 transition-all text-center"
          >
            Sign Out
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;