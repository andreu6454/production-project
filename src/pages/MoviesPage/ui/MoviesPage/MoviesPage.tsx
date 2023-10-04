import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './MoviesPage.module.scss';
import {memo} from 'react';
import {Page} from "@/widgets/Page/Page";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {MoviesPageReducer} from "@/pages/MoviesPage/model/slices/MoviesPageSlice";

interface MoviesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    moviesPage: MoviesPageReducer
}

const MoviesPage = memo((props: MoviesPageProps) => {
    const {className} = props;
    const {t} = useTranslation();

    return (
        <DynamicModuleLoader name={'moviesPage'} reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.MoviesPage, {}, [className])}>
                MoviesPage
            </Page>
        </DynamicModuleLoader>
    );
});

export default MoviesPage;