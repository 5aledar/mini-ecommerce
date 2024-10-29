import { useState, useEffect, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { checkToken } from '../../utils/checkToken';

interface PrivateRoutesProps {
    children: ReactNode; // Accept children as props
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
    const { pathname } = useLocation();
    const [isValidToken, setIsValidToken] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const validateToken = async () => {
            const valid = await checkToken();
            setIsValidToken(valid);
        };

        validateToken();
    }, [pathname]);

    if (isValidToken === undefined) {
        return null; // Loading state
    }

    // Redirect authenticated users away from /auth
    if (isValidToken && pathname.startsWith('/auth')) {
        return <Navigate to="/" replace />;
    }

    // Render children if authenticated or redirect to /auth if not
    return isValidToken ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default PrivateRoutes;