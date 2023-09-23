import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleAdditionalInfo.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {User} from "@/entities/User";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Avatar} from "@/shared/ui/redesigned/Avatar";
import {Text} from "@/shared/ui/redesigned/Text";
import {ArticleEditButton} from "src/features/articleEditButton";
import {BackToArticlesButton} from "src/features/backToArticlesButton";

interface ArticleAdditionalInfoProps {
    className?: string;
    author?: User;
    createdAt: string;
    views: number;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const {
        className,
        author,
        createdAt,
        views
    } = props
    const {t} = useTranslation()


    return (
        <VStack
            align={'start'}
            max
            gap={'32'}
            className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
        >
            <HStack gap={'8'}>
                <Avatar size={50} src={author?.avatar}/>
                <Text bold text={author?.username}/>
                <Text bold text={createdAt}/>
            </HStack>
            <BackToArticlesButton/>
            <ArticleEditButton/>
            <Text text={t('{{count}} Просмотров', {count: views})}/>
        </VStack>
    );
});
