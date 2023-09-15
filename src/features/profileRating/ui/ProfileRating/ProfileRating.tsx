import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {useCallback} from "react";
import {Skeleton} from "@/shared/ui/deprecated/Skeleton";
import {useGetProfileRating, useRateProfile} from "../../api/profileRatingApi";
import {RatingCard} from "@/entities/Rating";

export interface ProfileRatingProps {
    className?: string;
    profileId: string
}

const ProfileRating = (props: ProfileRatingProps) => {

    const {className, profileId} = props;

    const {t} = useTranslation('profile');

    const userData = useSelector(getUserAuthData)


    const {data, isLoading} = useGetProfileRating({
        profileId,
        userId: userData?.id ?? ''
    })

    const [rateArticleMutation] = useRateProfile()


    const rating = data?.[0]

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                profileId,
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
        return <Skeleton width={'100%'} height={120}/>
    }
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t("Оцените профиль")}
            feedbackTitle={t('Оставьте свой отзыв о профиле')}
            hasFeedback
        />
    );
};

export default ProfileRating;