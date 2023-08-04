export {ProfileCard} from "enteties/Profile/ui/ProfileCard/ProfileCard";

export {fetchProfileData} from "enteties/Profile/model/services/fetchProfileData/fetchProfileData";

export type {Profile, ProfileSchema} from './model/types/profile'


export {
    profileActions,
    profileReducer
} from './model/slice/profileSlice'