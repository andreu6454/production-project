import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './MovieDetailsPage.module.scss';
import {memo} from 'react';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Page} from "@/widgets/Page/Page";
import {useParams} from "react-router-dom";
import {Text} from "@/shared/ui/redesigned/Text";
import {MovieDetailsReducer} from "@/entities/Movie/";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {MovieDetailsContainer} from "../MovieDetailsContainer/MovieDetailsContainer";

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
                <Text variant={'error'} title={"Ошибка"} text={t("Фильм не найден")}/>
            </div>
        )
    }

    // todo Добавить обработку ошибок

    return (
        <DynamicModuleLoader name={'movieDetails'} reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.MoviesPage, {}, [className])}>
                <VStack gap={'32'}>
                    <MovieDetailsContainer id={Number(id)}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default MovieDetailsPage;