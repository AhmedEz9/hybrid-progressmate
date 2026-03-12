import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/ContextHooks';

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    localStorage.removeItem('token');
    
    handleLogout();
  }, [handleLogout]);

  return <Navigate to="/" replace />;
};

export default Logout;