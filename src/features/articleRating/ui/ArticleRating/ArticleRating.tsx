import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {RatingCard} from "@/entities/Rating";
import {useGetArticleRating, useRateArticle} from "../../api/articleRatingApi";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Skeleton as SkeletonDeprecated} from "@/shared/ui/deprecated/Skeleton";
import {ToggleFeatures} from "@/shared/lib/features";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";
import {getArticleDetailsError} from "@/entities/Article/model/selectors/articleDetails";

export interface ArticleRatingProps {
    className?: string;
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {className, articleId} = props;
    const {t} = useTranslation('article-details');
    const userData = useSelector(getUserAuthData)
    const error = useSelector(getArticleDetailsError)

    const {data, isLoading} = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    })
    const [rateArticleMutation] = useRateArticle()


    const rating = data?.[0]

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback
            })
        } catch (e) {
            console.log(e)
        }

    }, [])

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount)
    }, [handleRateArticle])

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback)
    }, [handleRateArticle])

    if (isLoading) {
        return (
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <Skeleton border={'20px'} width={'100%'} height={200}/>
                }
                off={
                    <SkeletonDeprecated width={'100%'} height={120}/>
                }
            />
        )
    }
    return (
        <>
            {
                !error &&
                <RatingCard
                    onAccept={onAccept}
                    onCancel={onCancel}
                    rate={rating?.rate}
                    className={className}
                    title={t("Оцените статью")}
                    feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
                    hasFeedback
                />
            }
        </>

    );
});

export default ArticleRating