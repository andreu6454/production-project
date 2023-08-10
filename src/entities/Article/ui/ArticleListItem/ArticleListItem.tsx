import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {memo, useCallback} from "react";
import {Article, ArticleView} from "entities/Article";
import {Text} from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye-20-20.svg"
import {Icon} from "shared/ui/Icon/Icon";
import {Card} from "shared/ui/Card/Card";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Button} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import {ArticleBlockType, ArticleTextBlock} from "../../model/types/article";
import {ArticleTextBlockComponent} from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}


export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {className, article, view} = props

    const {t} = useTranslation('article')
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id)
    }, [navigate])

    const types = <Text text={article.type.join(', ')} className={cls.types}/>
    const views = (<>
        <Text text={String(article.views)} className={cls.views}/>
        <Icon Svg={EyeIcon}/>
    </>)


    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar}/>
                        <Text className={cls.userName} text={article.user.username}/>
                        <Text className={cls.date} text={article.createdAt}/>
                    </div>
                    <Text title={article.title} className={cls.title}/>
                    {types}
                    <img src={article.img} className={cls.img} alt={article.title}/>
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                    )}
                    <div className={cls.footer}>
                        <Button onClick={onOpenArticle}>{t("Читать далее...")}</Button>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle}>
                <div className={cls.imgWrapper}>
                    <img alt={article.title} src={article.img} className={cls.img}/>
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </div>
    );
});
