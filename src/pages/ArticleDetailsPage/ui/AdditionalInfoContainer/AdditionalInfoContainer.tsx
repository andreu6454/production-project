import {memo} from "react";
import {ArticleAdditionalInfo} from "@/widgets/ArticleAdditionalInfo";
import {Card} from "@/shared/ui/redesigned/Card";
import {useSelector} from "react-redux";
import {getArticleDetailsData} from "@/entities/Article";
import cls from './AdditionalInfoContainer.module.scss'

export const AdditionalInfoContainer = memo(() => {

    const article = useSelector(getArticleDetailsData)

    if (!article) {
        return null;
    }

    return (
        <Card padding={'24'} className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}/>
        </Card>
    );
});
