import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "../ContextAPI/UserProvider";

export function PrivateRoutes({children}) {
    
    const {isAuth} = useContext(UserAuth);
    const location = useLocation();

    if(!isAuth){
        return <Navigate to='/login' state={location.pathname} replace={true} />
    }

    return children;
}
