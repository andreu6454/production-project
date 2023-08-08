import {JSX} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {Navigate, useLocation} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

function RequireAuth({children}: {children: JSX.Element}) {
    let auth = useSelector(getUserAuthData)
    let location = useLocation()

    if(!auth){
        return <Navigate to={RoutePath.main} state={{from: location}} replace/>
    }

    return children
}

export default RequireAuth