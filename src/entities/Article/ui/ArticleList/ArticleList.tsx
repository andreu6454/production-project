import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {memo} from "react";
import {Article, ArticleView} from "entities/Article";
import {ArticleListItem} from "../ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/Text/Text";
import {useTranslation} from "react-i18next";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} view={view} key={index}/>
        ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props

    const {t} = useTranslation('article')

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id}
                article={article}
                view={view}
                className={cls.card}
            />
        )
    }


    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t("Статьи не найдены")}/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && getSkeletons(view)}
        </div>
    );
});
