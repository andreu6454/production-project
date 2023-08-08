import {userActions, userReducer} from "./model/slice/userSlice";
import type {User, UserSchema} from './model/types/userSchema'
import {getUserAuthData} from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import {getUserInited} from "entities/User/model/selectors/getUserInited/getUserInited";


export {
    userReducer,
    userActions,
    User,
    UserSchema,
    getUserAuthData,
    getUserInited
}