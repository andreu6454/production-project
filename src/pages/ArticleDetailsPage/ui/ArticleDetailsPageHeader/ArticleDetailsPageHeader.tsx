import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/shared/ui/deprecated/Button";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCanEditArticle} from "@/pages/ArticleDetailsPage/model/selectors/article";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {getRouteArticles} from "@/shared/const/router";
import {ArticleEditButton} from "@/features/ArticleEditButton";

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {className} = props
    const {t} = useTranslation()
    const navigate = useNavigate()

    const canEdit = useSelector(getCanEditArticle)


    const onBackToList = useCallback(() => {
        navigate(getRouteArticles())
    }, [navigate])


    return (
        <HStack max justify={'between'} className={classNames('', {}, [className])}>
            <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
            {canEdit && <ArticleEditButton/>}
        </HStack>
    );
});
