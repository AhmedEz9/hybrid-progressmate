import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/ContextHooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
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
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🔐</span>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to track your progress</p>
        </div>

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
      </div>
    </div>
  );
};

export default Login;