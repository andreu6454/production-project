import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {useSelector} from "react-redux";
import {getMovieDetailsData} from "../../model/selectors/movieDetails";
import {memo} from "react";

interface MovieTrailerProps {
    className?: string;
}

export const MovieTrailer = memo((props: MovieTrailerProps) => {
    const {className} = props
    const {t} = useTranslation('movies')

    const data = useSelector(getMovieDetailsData)

    if(!data?.videos?.trailers?.[0]?.url){
        return null
    }

    return (
        <VStack gap={'16'} max className={classNames('', {}, [className])}>
            <Text title={t('Трейлер')} bold/>
            <HStack max align={'center'} justify={'center'}>
                <iframe
                    width="800px"
                    height="400px"
                    src={data?.videos?.trailers?.[0].url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </HStack>
        </VStack>
    );
});
