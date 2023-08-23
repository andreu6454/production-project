import {lazy, Suspense} from "react";
import {Skeleton} from "@/shared/ui/Skeleton";
import {ProfileRatingProps} from "./ProfileRating";

export const ProfileRatingLazy = lazy(() => import('./ProfileRating'))

export const ProfileRatingAsync = (props: ProfileRatingProps) => {
    return (
        <Suspense fallback={<Skeleton height={120} width={'100%'}/>}>
            <ProfileRatingLazy {...props}/>
        </Suspense>
    )
}