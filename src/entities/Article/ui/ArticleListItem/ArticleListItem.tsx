import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {HTMLAttributeAnchorTarget, memo} from "react";
import {Article, ArticleBlockType, ArticleTextBlock, ArticleView} from "../../model/types/article";
import {Text} from "@/shared/ui/deprecated/Text";
import EyeIcon from "@/shared/assets/icons/eye-20-20.svg"
import {Icon} from "@/shared/ui/deprecated/Icon";
import {Card} from "@/shared/ui/deprecated/Card";
import {Avatar} from "@/shared/ui/deprecated/Avatar";
import {Button} from "@/shared/ui/deprecated/Button";
import {useTranslation} from "react-i18next";
import {ArticleTextBlockComponent} from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import {AppLink} from "@/shared/ui/deprecated/AppLink";
import {getRouteArticleDetails} from "@/shared/const/router";
import {AppImage} from "@/shared/ui/deprecated/AppImage";
import {Skeleton} from "@/shared/ui/deprecated/Skeleton";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget
}


export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {className, article, view, target} = props

    const {t} = useTranslation('article')


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
                    <AppImage
                        fallback={<Skeleton width={"100%"} height={250}/>}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                    )}
                    <div className={cls.footer}>
                        <AppLink to={getRouteArticleDetails(article.id)}>
                            <Button>{t("Читать далее...")}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card>
                <div className={cls.imgWrapper}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200}/>}
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </AppLink>
    );
});
