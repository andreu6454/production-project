import {useMemo} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData, getUserRoles} from "@/entities/User";
import {Navigate, useLocation} from "react-router-dom";
import {UserRole} from "@/entities/User/model/types/userSchema";
import {getRouteForbidden, getRouteMain} from "@/shared/const/router";

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
        return (<Navigate to={getRouteMain()} state={{from: location}} replace/>)
    }
    if (!hasRequiredRoles) {
        return (<Navigate to={getRouteForbidden()} state={{from: location}} replace/>)
    }

    if (!children) {
        return null
    }

    return children
}

export default RequireAuth