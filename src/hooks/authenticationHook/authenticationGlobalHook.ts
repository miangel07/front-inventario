// import { useEffect, useState } from 'react';

// export const useAuth = () => {
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // AGREGADO: Estado de carga

//   // Función para sincronizar con localStorage
//   const syncAuth = () => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('access_token');
    
//     if (storedUser && storedToken) {
//       try {
//         setUser(JSON.parse(storedUser));
//         setToken(storedToken);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('user');
//         localStorage.removeItem('access_token');
//         setUser(null);
//         setToken(null);
//         setIsAuthenticated(false);
//       }
//     } else {
//       setUser(null);
//       setToken(null);
//       setIsAuthenticated(false);
//     }
//     setIsLoading(false); // AGREGADO: Finalizar carga
//   };

//   useEffect(() => {
//     // Sincronizar al montar
//     syncAuth();

//     // Escuchar cambios en localStorage
//     const handleStorageChange = () => {
//       syncAuth();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const login = (userData: any, token: string) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('access_token', token);
//     setUser(userData);
//     setToken(token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('access_token');
//     setUser(null);
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   return { user, token, login, logout, isAuthenticated, isLoading };
// };

// En authenticationGlobalHook.ts


// import { useState } from 'react';

// export const useAuth = () => {
//   const [user, setUser] = useState<any>(null);
//   const [tempUser, setTempUser] = useState<any>(null); // Nuevo estado para usuario temporal
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const login = (userData: any, token?: string) => {
//     if (token) {
//       localStorage.setItem('access_token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//       setIsAuthenticated(true);
//     } else {
//       // Caso donde necesitamos selección de bodega
//       setTempUser(userData);
//     }
//   };

//   const confirmStorage = (userData: any, token: string) => {
//     localStorage.setItem('access_token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//     setTempUser(null);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setTempUser(null);
//     setIsAuthenticated(false);
//   };

//   return {
//     user,
//     tempUser, // Exportamos el usuario temporal
//     isAuthenticated,
//     isLoading,
//     login,
//     confirmStorage, // Nueva función para confirmar bodega
//     logout,
//   };
// };


import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [tempUser, setTempUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar estado desde localStorage al cargar
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('access_token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: any, token?: string) => {
    if (token) {
      // Login completo (casos con 0 o 1 storage)
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      setTempUser(null); // Limpiar usuario temporal si existía
    } else {
      // Usuario temporal (caso con múltiples storages)
      setTempUser(userData);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const confirmStorage = (userData: any, token: string) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setTempUser(null);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    setTempUser(null);
    setIsAuthenticated(false);
  };

  const clearTempUser = () => {
    setTempUser(null);
  };

  return {
    user,
    tempUser,
    isAuthenticated,
    isLoading,
    login,
    confirmStorage,
    logout,
    clearTempUser, // Nueva función para limpiar usuario temporal
  };
};