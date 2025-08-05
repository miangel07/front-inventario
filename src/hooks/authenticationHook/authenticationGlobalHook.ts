import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { 
  initializeAuth,
  login as reduxLogin,
  logout as reduxLogout,
  confirmStorage as reduxConfirmStorage,
  setTempUser as reduxSetTempUser,
  clearTempUser as reduxClearTempUser,
  updateUser as reduxUpdateUser
} from '@/store/slice/authSlice';
import { AuthUserType } from '@/types/authTypes/authTypes';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {
    user,
    tempUser,
    isAuthenticated,
    isLoading,
    token
  } = useAppSelector(state => state.auth);

  // Inicializar desde localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user');
        
        const userData = storedUser ? JSON.parse(storedUser) : null;
        dispatch(initializeAuth({
          user: userData,
          token: storedToken
        }));
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        dispatch(initializeAuth({ user: null, token: null }));
      }
    };

    initAuth();
  }, [dispatch]);

  const login = (userData: AuthUserType, token: string) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(reduxLogin({ user: userData, token }));
  };

  const setTempUser = (userData: AuthUserType) => {
    dispatch(reduxSetTempUser(userData));
  };

  const confirmStorage = (userData: AuthUserType, token: string) => {
  const userToStore = {
    ...userData,
    storageId: userData.storage?.id ?? null,
    // Eliminar storages ya que no son necesarios después de la selección
    storages: undefined
  };
  localStorage.setItem('access_token', token);
  localStorage.setItem('user', JSON.stringify(userToStore));
  dispatch(reduxConfirmStorage({ user: userToStore, token }));
};


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    dispatch(reduxLogout());
  };

  const clearTempUser = () => {
    dispatch(reduxClearTempUser());
  };

  const updateUser = (userData: AuthUserType) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(reduxUpdateUser(userData));
  };

  return {
    user,
    tempUser,
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
    setTempUser,
    confirmStorage,
    clearTempUser,
    updateUser
  };
};