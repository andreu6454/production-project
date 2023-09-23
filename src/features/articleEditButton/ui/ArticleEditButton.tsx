import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {getRouteArticleEdit} from "@/shared/const/router";
import {ToggleFeatures} from "@/shared/lib/features";
import {Button as ButtonDeprecated} from "@/shared/ui/deprecated/Button";
import {Button} from "@/shared/ui/redesigned/Button";
import {useSelector} from "react-redux";
import {getCanEditArticle} from "@/pages/ArticleDetailsPage/model/selectors/article";
import {getArticleDetailsData} from "@/entities/Article";

interface ArticleEditButtonProps {
    className?: string;
}

export const ArticleEditButton = memo((props: ArticleEditButtonProps) => {
    const {className} = props
    const {t} = useTranslation('article-details')

    const article = useSelector(getArticleDetailsData)

    const canEdit = useSelector(getCanEditArticle)

    const navigate = useNavigate()

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article?.id || ''))
        }
    }, [article, navigate])

    if(!canEdit){
        return null
    }

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Button onClick={onEditArticle} className={className}>
                    {t('Редактировать')}
                </Button>
            }
            off={
                <ButtonDeprecated onClick={onEditArticle} className={className}>
                    {t('Редактировать')}
                </ButtonDeprecated>
            }
        />

    );
});
