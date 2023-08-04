import {getProfileIsLoading} from "enteties/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileData} from "enteties/Profile/model/selectors/getProfileData/getProfileData";
import {getProfileError} from "enteties/Profile/model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "enteties/Profile/model/selectors/getProfileReadonly/getProfileReadonly";


export {updateProfileData} from "enteties/Profile/model/services/updateProfileData/updateProfileData";

export {ProfileCard} from "enteties/Profile/ui/ProfileCard/ProfileCard";

export {fetchProfileData} from "enteties/Profile/model/services/fetchProfileData/fetchProfileData";

export type {Profile, ProfileSchema} from './model/types/profile'

export {
    getProfileIsLoading,
    getProfileData,
    getProfileError,
    getProfileReadonly
}

export {
    profileActions,
    profileReducer
} from './model/slice/profileSlice'