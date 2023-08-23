import {lazy, Suspense} from "react";
import {ArticleRatingProps} from "./ArticleRating";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Skeleton height={120} width={'100%'}/>}>
            <ArticleRatingLazy {...props}/>
        </Suspense>
    )
}