import {rtkApi} from "@/shared/api/rtkApi";
import {Rating} from "@/entities/Rating";


interface GetProfileArg {
    userId: string,
    profileId: string
}

interface RateProfileArg {
    userId: string,
    profileId: string,
    rate: number,
    feedback?: string
}


export const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GetProfileArg>({
            query: ({userId, profileId}) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId
                }
            }),
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            query: (arg) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: arg
            }),
        })
    })
})

export const useGetProfileRating =
    profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation