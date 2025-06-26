
import { useAuth } from '@/hooks/authenticationHook/authenticationGlobalHook';
import { Navigate, Outlet } from 'react-router-dom';

// export const ProtectedRoute = ({ roles }: { roles?: string[] }) => {
//   const { user, isAuthenticated, isLoading } = useAuth();

  
//   if (isLoading) {
//     return <div>Cargando...</div>; // O tu componente de loading preferido
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && user && !roles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };



// En ProtectedRoute.tsx
export const ProtectedRoute = ({ roles }: { roles?: string[] }) => {
  const { user, tempUser, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Si hay un usuario temporal pero no autenticado, significa que necesita seleccionar bodega
  if (tempUser && !isAuthenticated) {
    return <Navigate to="/login" replace />; // O podrías redirigir a una página específica
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};