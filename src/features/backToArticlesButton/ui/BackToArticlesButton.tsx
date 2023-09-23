import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {ToggleFeatures} from "@/shared/lib/features";
import {Button as ButtonDeprecated} from "@/shared/ui/deprecated/Button";
import {Button} from "@/shared/ui/redesigned/Button";
import {useNavigate} from "react-router-dom";
import {getRouteArticles} from "@/shared/const/router";


export const BackToArticlesButton = memo(() => {

    const {t} = useTranslation('article-details')

    const navigate = useNavigate()

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles())
    }, [navigate])

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
            }
            off={
                <ButtonDeprecated onClick={onBackToList}>{t("Назад к списку")}</ButtonDeprecated>
            }
        />
    );
});
