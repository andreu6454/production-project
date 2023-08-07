import {getProfileIsLoading} from "./model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileData} from "./model/selectors/getProfileData/getProfileData";
import {getProfileError} from "./model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "./model/selectors/getProfileReadonly/getProfileReadonly";
import {
    getProfileValidateErrors
} from "./model/selectors/getProfileValidateErrors/getProfileValidateErrors";


export {updateProfileData} from "./model/services/updateProfileData/updateProfileData";

export {ProfileCard} from "./ui/ProfileCard/ProfileCard";

export {fetchProfileData} from "./model/services/fetchProfileData/fetchProfileData";

export type {Profile, ProfileSchema} from './model/types/profile'

export {
    getProfileIsLoading,
    getProfileData,
    getProfileError,
    getProfileReadonly,
    getProfileValidateErrors
}

export {
    profileActions,
    profileReducer
} from './model/slice/profileSlice'