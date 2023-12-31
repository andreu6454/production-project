import {RouteProps} from "react-router-dom";
import {UserRole} from "@/entities/User/model/types/userSchema";

export type AppRouteProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}
