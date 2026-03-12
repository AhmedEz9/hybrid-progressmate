import { useContext } from 'react';
import { useNavigate } from 'react-router';
import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { UserContext } from '../contexts/UserContext';
import type { Credentials } from '../types/LocalTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const { postLogin } = useAuthentication();
  const userContext = useContext(UserContext);

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async (formInputs: Record<string, string>) => {
    try {
      const result = await postLogin(formInputs as unknown as Credentials);
      localStorage.setItem('token', result.token);

      if (userContext) {
        userContext.handleLogin(result.user);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error during login:', (error as Error).message);
      alert('Login failed. Check your username and password.');
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="loginusername" className="block text-sm font-semibold text-gray-700 mb-1">
          Username
        </label>
        <input
          name="username"
          type="text"
          id="loginusername"
          onChange={handleInputChange}
          autoComplete="username"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="loginpassword" className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          autoComplete="current-password"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="••••••••"
        />
      </div>
      <button 
        type="submit"
        className="mt-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;