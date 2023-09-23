import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Text as TextDeprecated, TextSize} from "@/shared/ui/deprecated/Text";
import {ArticleList} from "@/entities/Article";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {useArticleRecommendationsList} from "../../api/articleRecommendationsApi";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";

interface ArticleRecommendationsListProps {
    className?: string;
}


export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const {className} = props;
    const {t} = useTranslation('article-details');

    const {data: articles, isLoading, error} = useArticleRecommendationsList(2)

    // временная заглушка
    if (isLoading || error || !articles) {
        return null
    }

    return (
        <VStack
            align={'start'}
            gap={'8'} className={classNames('', {}, [className])}
        >
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={<Text size={'l'} title={t("Рекомендуем")}/>}
                off={<TextDeprecated size={TextSize.L} title={t("Рекомендуем")}/>}
            />

            <ArticleList
                target={"_blank"}
                articles={articles}
                isLoading={isLoading}
            />
        </VStack>

    );
});