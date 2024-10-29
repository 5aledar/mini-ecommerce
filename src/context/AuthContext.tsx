import  { createContext, useState, useContext } from 'react';
import { AuthContextType } from '../utils/types';
// Define the shape of the Auth context


// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: any }) => {
    const [token, setToken] = useState<string | null>(null);
    return (
        
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;