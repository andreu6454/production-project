import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './MovieDetailsPage.module.scss';
import {memo} from 'react';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Page} from "@/widgets/Page/Page";
import {useParams} from "react-router-dom";
import {Text, TextTheme} from "@/shared/ui/deprecated/Text";
import {MovieDetailsReducer} from "@/entities/Movie/model/slices/movieDetailsSlice";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Card} from "@/shared/ui/redesigned/Card";
import {MovieDetails} from "@/entities/Movie/ui/MovieDetails/MovieDetails";

interface MovieDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    movieDetails: MovieDetailsReducer
}


const MovieDetailsPage = memo((props: MovieDetailsPageProps) => {
    const {className} = props;
    const {t} = useTranslation('movies');



    const {id} = useParams<{ id: string }>()

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <Text theme={TextTheme.ERROR} title={"Ошибка"} text={t("Фильм не найден")}/>
            </div>
        )
    }



    return (
        <DynamicModuleLoader name={'movieDetails'} reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.MoviesPage, {}, [className])}>
                <VStack gap={'32'}>
                    <Card padding={'24'} border={'partial'} max>
                        <MovieDetails id={Number(id)}/>
                    </Card>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default MovieDetailsPage;