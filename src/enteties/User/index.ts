import {userActions, userReducer} from "./model/slice/userSlice";
import type {User, UserSchema} from './model/types/userSchema'
import {getUserAuthData} from "enteties/User/model/selectors/getUserAuthData/getUserAuthData";


export {
    userReducer,
    userActions,
    User,
    UserSchema,
    getUserAuthData
}