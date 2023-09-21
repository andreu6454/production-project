import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {Article, ArticleBlockType, ArticleTextBlock, ArticleView} from "../../../model/types/article";
import {HTMLAttributeAnchorTarget} from "react";
import {Text} from "@/shared/ui/redesigned/Text";
import cls from "./ArticleListItemRedesigned.module.scss";
import {Icon} from "@/shared/ui/redesigned/Icon";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import {Card} from "@/shared/ui/redesigned/Card";
import {Avatar} from "@/shared/ui/redesigned/Avatar";
import {AppImage} from "@/shared/ui/redesigned/AppImage";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";
import {AppLink} from "@/shared/ui/redesigned/AppLink";
import {getRouteArticleDetails} from "@/shared/const/router";
import {Button} from "@/shared/ui/redesigned/Button";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
    const {className, article, view, target} = props

    const {t} = useTranslation('article')


    const types = <Text text={article.type.join(', ')} size={'s'} className={cls.types}/>

    const userInfo = (
        <>
            <Avatar size={32} src={article.user.avatar} className={cls.avatar}/>
            <Text bold text={article.user.username}/>
        </>
    )

    const views = (
        <HStack gap={'8'}>
            <Icon Svg={EyeIcon}/>
            <Text text={String(article.views)} className={cls.views}/>
        </HStack>
    )


    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock

        return (
            <Card
                border={"partial"}
                padding={'24'}
                max
                className={classNames(cls.ArticleListItemRedesigned, {}, [className, cls[view]])}
            >
                <VStack max gap={'16'} align={'start'}>
                    <HStack gap={'8'}>
                        {userInfo}
                        <Text text={article.createdAt}/>
                    </HStack>

                    <Text bold title={article.title}/>
                    <Text title={article.subtitle} size={'s'}/>
                    {types}
                    <AppImage
                        fallback={<Skeleton width={"100%"} height={250}/>}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack max justify={'between'}>
                        <AppLink to={getRouteArticleDetails(article.id)}>
                            <Button>{t("Читать далее...")}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        )
    }

    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card} border={'partial'} padding={'0'}>
                <AppImage
                    fallback={<Skeleton width={'100%'} height={200}/>}
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack align={'start'} gap={'4'} max className={cls.info}>
                    <Text align={'center'} title={article.title} className={cls.title}/>
                    <HStack max gap={'4'} wrap={'wrap'}>{types}</HStack>
                    <VStack gap={'4'} className={cls.footer} align={'start'} max>
                        <HStack justify={'between'} max>
                            <Text text={article.createdAt} className={cls.date}/>
                            {views}
                        </HStack>
                        <HStack gap={'4'}>
                            {userInfo}
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
};
