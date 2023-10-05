import {classNames} from "@/shared/lib/classNames/classNames";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {Card} from "@/shared/ui/redesigned/Card";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {AppImage} from "@/shared/ui/redesigned/AppImage";
import {memo} from "react";
import {AppLink} from "@/shared/ui/redesigned/AppLink";
import {getRouteMoviesDetails} from "@/shared/const/router";
import cls from './MovieListItem.module.scss'

interface MovieListItemProps {
    className?: string;
    movie: MovieDtoV13;
    index?: number;
}

export const MovieListItem = memo((props: MovieListItemProps) => {
    const {className, movie, index} = props

    const description =
        `${movie?.countries?.[0].name}*${movie?.genres?.[0].name}`

    const description2 = movie.shortDescription

    const votesCount: number = Number(movie?.votes?.kp)

    return (
        <Card
            padding={'24'}
            max
            border={'partial'}
            className={classNames('', {}, [className])}
        >
            <HStack justify={'between'} gap={'32'} align={'start'}>
                <AppLink to={getRouteMoviesDetails(movie?.id + '')}>
                    <HStack gap={'32'} className={cls.description}>
                        <Text bold title={index + ''}/>
                        <AppImage src={movie.poster?.previewUrl} width={72} height={108}/>
                        <VStack>
                            <Text title={movie.name} text={movie.alternativeName} bold/>
                            <Text Opacity={'80%'} size={'s'} text={description}/>
                            <Text Opacity={'80%'} size={'s'} text={description2}/>
                        </VStack>
                    </HStack>
                </AppLink>
                <VStack align={'center'}>
                    <Text variant={'accent'} bold title={movie.rating?.kp?.toFixed(1) + ''} size={'l'}/>
                    <Text size={'s'} align={'center'} title={votesCount.toLocaleString('ru-Ru')} text={'оценок'}/>
                </VStack>
            </HStack>
        </Card>
    );
});
