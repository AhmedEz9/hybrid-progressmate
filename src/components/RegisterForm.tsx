import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';

const RegisterForm = () => {
  const { postRegister } = useAuthentication();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async (formInputs: Record<string, string>) => {
    try {
      await postRegister(formInputs);
      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Registration error:', (error as Error).message);
      alert('Registration failed. Username might already be taken.');
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="regusername" className="block text-sm font-semibold text-gray-700 mb-1">
          Username
        </label>
        <input
          name="username"
          type="text"
          id="regusername"
          onChange={handleInputChange}
          autoComplete="username"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Choose a username"
        />
      </div>
      <div>
        <label htmlFor="regemail" className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="regemail"
          onChange={handleInputChange}
          autoComplete="email"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label htmlFor="regpassword" className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="regpassword"
          onChange={handleInputChange}
          autoComplete="new-password"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Create a password"
        />
      </div>
      <button 
        type="submit"
        className="mt-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95"
      >
        Register Account
      </button>
    </form>
  );
};

export default RegisterForm;