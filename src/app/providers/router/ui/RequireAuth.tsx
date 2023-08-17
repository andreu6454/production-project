import {JSX, useMemo} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData, getUserRoles} from "entities/User";
import {Navigate, useLocation} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {UserRole} from "entities/User/model/types/userSchema";

interface RequireAuthProps {
    children: JSX.Element,
    roles?: UserRole[]
}

function RequireAuth({children, roles}: RequireAuthProps) {
    let auth = useSelector(getUserAuthData)
    let location = useLocation()
    const userRoles = useSelector(getUserRoles)
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true
        }
        return roles.some(requiredRole => {
            const hasRole = userRoles?.includes(requiredRole)
            return hasRole
        })
    }, [roles, userRoles])

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{from: location}} replace/>
    }
    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{from: location}} replace/>
    }

    return children
}

export default RequireAuth