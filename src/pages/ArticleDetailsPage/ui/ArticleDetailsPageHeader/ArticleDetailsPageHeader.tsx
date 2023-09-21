import {memo} from "react";
import {useSelector} from "react-redux";
import {getCanEditArticle} from "@/pages/ArticleDetailsPage/model/selectors/article";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {ArticleEditButton} from "@/features/ArticleEditButton";
import {BackToArticlesButton} from "@/features/BackToArticlesButton/ui/BackToArticlesButton";


export const ArticleDetailsPageHeader = memo(() => {

    const canEdit = useSelector(getCanEditArticle)


    return (
        <HStack max justify={'between'}>
            <BackToArticlesButton/>
            {canEdit && <ArticleEditButton/>}
        </HStack>
    );
});
