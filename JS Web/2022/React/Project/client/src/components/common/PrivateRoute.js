import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from "../../custom-hooks/userHooks"


export const PrivateRoute = () => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to={'/login'} />
    }
    return <Outlet />;
};