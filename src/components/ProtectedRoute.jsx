import { Navigate } from 'react-router-dom';

export function ProtectedRoute({isAuthenticated, element}){
    return isAuthenticated ? element : <Navigate to="/adminlogin" />;
}