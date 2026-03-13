import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/ContextHooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  
  const { postLogin } = useAuthentication();
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();

  const initValues = { username: '', password: '' };

  const doLogin = async (inputs: Record<string, string>) => {
    try {
      const loginResponse = await postLogin(inputs as { username: string; password: string });
      
      localStorage.setItem('token', loginResponse.token);
      
      if (handleLogin) {
        handleLogin(loginResponse.user);
      }
      
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <div className="max-w-md mx-auto mt-12 px-4 mb-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white">
        
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">{isLogin ? '🔐' : '👋'}</span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLogin ? 'Sign in to track your progress' : 'Start your journey today'}
          </p>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Username</label>
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Sign In
            </button>
          </form>
        ) : (
          <RegisterForm />
        )}

        {/* The Toggle Button */}
        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-gray-600 text-sm font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;