import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';
import {StateSchema} from "app/providers/storeProvider";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useSelector((state:StateSchema) => state.user.userAuthData);
    const location = useLocation();


    // redirect to the main page, if user don't log in
    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
