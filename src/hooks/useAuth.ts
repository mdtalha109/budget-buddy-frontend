import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null
    name: string | null;
    email: string | null;
  };
}

const useAuth = (): AuthState => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);

  return { isAuthenticated, user };
};

export default useAuth;