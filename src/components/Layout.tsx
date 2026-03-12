import { Link, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from '../hooks/ContextHooks';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const { user } = useUserContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* The Toaster component that displays the popups */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 3000,
          style: { borderRadius: '16px', background: '#333', color: '#fff' } 
        }} 
      />

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2 group">
            <span className="group-hover:-translate-y-1 transition-transform duration-300">🚀</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              ProgressMate
            </span>
          </Link>
          
          <nav className="flex items-center gap-1 sm:gap-3 text-sm font-semibold">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-xl transition-all ${isActive('/') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm'}`}
            >
              Timeline
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/upload" 
                  className={`hidden sm:flex items-center gap-1 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 ${isActive('/upload') ? 'bg-indigo-700 text-white shadow-md' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'}`}
                >
                  <span className="text-lg leading-none">+</span> Add Progress
                </Link>
                
                <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block"></div> 
                
                <Link 
                  to="/profile" 
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isActive('/profile') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-extrabold uppercase shadow-inner">
                    {user.username.charAt(0)}
                  </div>
                  <span className="hidden sm:block">{user.username}</span>
                </Link>
                
                <Link 
                  to="/logout" 
                  className="text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-sm px-3 py-2 rounded-xl transition-all"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95 ml-2"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;