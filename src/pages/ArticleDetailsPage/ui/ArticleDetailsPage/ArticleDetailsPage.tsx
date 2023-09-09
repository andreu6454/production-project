import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleDetails} from "@/entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextTheme} from "@/shared/ui/Text";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Page} from "@/widgets/Page/Page";
import {articleDetailsPageReducer} from "../../model/slices";
import {
    ArticleDetailsPageHeader
} from "@/pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {VStack} from "@/shared/ui/Stack";
import {ArticleRecommendationsList} from "@/features/articleRecommendationsList";
import {ArticleDetailsComments} from "@/pages/ArticleDetailsPage/ui/ArticleDetailsComments/ArticleDetailsComments";
import {ArticleRating} from "@/features/articleRating";
import {getFeatureFlags} from "@/shared/lib/features";


interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details')

    const {id} = useParams<{ id: string }>()

    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled')


    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <Text theme={TextTheme.ERROR} title={"Ошибка"} text={t("Статья не найдена")}/>
            </div>
        )
    }

    return (
        <DynamicModuleLoader name={"articleDetailsPage"} removeAfterUnmount reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <VStack align={'start'} gap={'16'} max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    {isArticleRatingEnabled && <ArticleRating articleId={id}/>}
                    <ArticleRecommendationsList/>
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);