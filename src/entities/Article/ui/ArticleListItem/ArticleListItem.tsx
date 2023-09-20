import {Article, ArticleView} from "@/entities/Article";
import {HTMLAttributeAnchorTarget} from "react";
import {ArticleListItemRedesigned} from './ArticleListItemRedesigned/ArticleListItemRedesigned'
import {ArticleListItemDeprecated} from './ArticleListItemDeprecated/ArticleListItemDeprecated'
import {ToggleFeatures} from "@/shared/lib/features";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <ArticleListItemRedesigned {...props}/>
            }
            off={
                <ArticleListItemDeprecated {...props}/>
            }
        />
    );
};
