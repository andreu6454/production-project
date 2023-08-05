import {getProfileIsLoading} from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileData} from "entities/Profile/model/selectors/getProfileData/getProfileData";
import {getProfileError} from "entities/Profile/model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly";


export {updateProfileData} from "entities/Profile/model/services/updateProfileData/updateProfileData";

export {ProfileCard} from "entities/Profile/ui/ProfileCard/ProfileCard";

export {fetchProfileData} from "entities/Profile/model/services/fetchProfileData/fetchProfileData";

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