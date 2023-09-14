import {userActions, userReducer} from "./model/slice/userSlice";
import type {User, UserSchema} from './model/types/userSchema'
import {getUserAuthData} from "./model/selectors/getUserAuthData/getUserAuthData";
import {getUserInited} from "./model/selectors/getUserInited/getUserInited";
import {getUserRoles, isUserAdmin, isUserManager} from "./model/selectors/roleSelectors/roleSelectors";
export {saveJsonSettings} from "./model/services/saveJsonSettings";


export {useJsonSettings,getJsonSettings} from "./model/selectors/jsonSettings";


export {
    userReducer,
    userActions,
    User,
    UserSchema,
    getUserAuthData,
    getUserInited,
    isUserAdmin,
    isUserManager,
    getUserRoles
}
