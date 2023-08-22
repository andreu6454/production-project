import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/shared/ui/Button/Button";
import {RoutePath} from "@/shared/config/routeConfig/routeConfig";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getArticleDetailsData} from "@/entities/Article";
import {getCanEditArticle} from "@/pages/ArticleDetailsPage/model/selectors/article";
import {HStack} from "@/shared/ui/Stack";

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {className} = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const article = useSelector(getArticleDetailsData)

    const canEdit = useSelector(getCanEditArticle)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [article?.id,navigate])

    return (
        <HStack max justify={'between'} className={classNames('', {}, [className])}>
            <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
            {canEdit && <Button
                onClick={onEditArticle}
            >
                {t("Редактировать")}
            </Button>}
        </HStack>
    );
});
