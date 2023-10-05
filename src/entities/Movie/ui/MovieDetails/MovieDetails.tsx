import cls from './MovieDetails.module.scss'
import {memo, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getMovieDetailsData,
    getMovieDetailsError,
    getMovieDetailsIsLoading
} from "@/entities/Movie/model/selectors/movieDetails";
import {fetchMovieById} from "@/entities/Movie/model/services/fetchMovieById/fetchMovieById";
import {AppImage} from "@/shared/ui/redesigned/AppImage";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {MovieAbout} from "@/entities/Movie/ui/MovieAbout/MovieAbout";
import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {MovieDetailsSkeleton} from "@/entities/Movie/ui/MovieDetails/MovieDetailsSkeleton";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {MovieTrailer} from "@/entities/Movie/ui/MovieTrailer/MovieTrailer";

interface MovieDetailsProps {
    className?: string;
    id?: number;
    data?: MovieDtoV13;
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
    const error = useSelector(getMovieDetailsError)


    useEffect(() => {
        dispatch(fetchMovieById(Number(id)))
    }, []);

    const votesCount: number = Number(data?.votes?.kp) || 0

    if (isLoading) {
        return (
            <MovieDetailsSkeleton/>
        )
    }

    // if (error) {
    //     return (
    //         <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
    //             <Text variant={'error'} title={"Ошибка"} text={error}/>
    //         </div>
    //     )
    // }

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
            <MovieTrailer/>
        </>
    );
});
