import cls from './MovieDetails.module.scss'
import {memo, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getMovieDetailsData, getMovieDetailsIsLoading} from "@/entities/Movie/model/selectors/movieDetails";
import {fetchMovieById} from "@/entities/Movie/model/services/fetchMovieById/fetchMovieById";
import {AppImage} from "@/shared/ui/redesigned/AppImage";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {MovieAbout} from "@/entities/Movie/ui/MovieAbout/MovieAbout";
import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {MovieDetailsSkeleton} from "@/entities/Movie/ui/MovieDetails/MovieDetailsSkeleton";

interface MovieDetailsProps {
    className?: string;
    id?: number
}

export const MovieDetails = memo((props: MovieDetailsProps) => {
    const {className, id} = props
    const {t} = useTranslation()

    if (!id) {
        return null
    }
    const dispatch = useAppDispatch()
    const data = useSelector(getMovieDetailsData)
    const isLoading = useSelector(getMovieDetailsIsLoading)


    useEffect(() => {
        dispatch(fetchMovieById(Number(id)))
    }, []);

    const votesCount: number = Number(data?.votes?.kp) || 0

    if (isLoading) {
        return (
            <MovieDetailsSkeleton/>
        )
    }

    return (

        <>
            <StickyContentLayout
                left={
                    <AppImage width={302} height={453} src={data?.poster?.url}/>
                }
                content={
                    <VStack justify={'start'} align={'start'} gap={'8'}>
                        <Text bold size={'l'} title={data?.name + ` (${data?.year})`}/>
                        <Text Opacity={'80%'} size={'s'} text={data?.alternativeName + ` ${data?.ageRating}+`}/>
                        <MovieAbout data={data}/>
                    </VStack>
                }
                right={
                    <VStack>
                            <span className={cls.rating}>
                                {data?.rating?.kp}
                            </span>
                        <span className={cls.votes}>
                                {votesCount.toLocaleString('ru-Ru')} оценок
                            </span>
                    </VStack>
                }
            />
            <VStack gap={'16'} align={'center'} max>
                <Text title={'Трейлер'} bold/>
                <iframe
                    width="800px"
                    height="400px"
                    src={data?.videos?.trailers?.[0].url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </VStack>
        </>
    );
});
