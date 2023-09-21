import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import cls from '../ArticleDetails.module.scss'
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Skeleton} from "@/shared/ui/deprecated/Skeleton";
import {Text, TextAlign, TextSize, TextTheme} from "@/shared/ui/deprecated/Text";
import {Avatar} from "@/shared/ui/deprecated/Avatar";
import {Icon} from "@/shared/ui/deprecated/Icon";
import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import CalendarIcon from "@/shared/assets/icons/calendar-20-20.svg";
import {Article} from "@/entities/Article";
import {renderArticleBlock} from "../renderArticleBlock";

interface ArticleDetailsDeprecatedProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
    error?: string;
}

export const ArticleDetailsDeprecated = (props: ArticleDetailsDeprecatedProps) => {
    const {className, article, isLoading, error} = props
    const {t} = useTranslation('article-details')



    let content

    if (isLoading) {
        content = (
            <VStack max align={'start'} gap={'8'}>
                <VStack max>
                    <Skeleton className={cls.avatar} width={200} height={200} border={"50%"}/>
                </VStack>
                <Skeleton className={cls.title} width={300} height={24}/>
                <Skeleton className={cls.skeleton} width={600} height={24}/>
                <Skeleton className={cls.skeleton} width={"100%"} height={180}/>
                <Skeleton className={cls.skeleton} width={"100%"} height={180}/>
            </VStack>
        )
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t("Произошла ошибка при загрузке статьи")}
            />
        )
    } else {
        content = (
            <>
                <HStack max justify={'center'} className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </HStack>

                <VStack gap={'4'} align={'start'} max>
                    <Text
                        size={TextSize.L}
                        title={article?.title}
                        text={article?.subtitle}
                        className={cls.title}
                    />
                    <HStack className={cls.articleInfo}>
                        <Icon className={cls.icon} Svg={EyeIcon}/>
                        <Text text={article?.views + ''}/>
                    </HStack>
                    <HStack align={'start'} className={cls.articleInfo}>
                        <Icon className={cls.icon} Svg={CalendarIcon}/>
                        <Text text={article?.createdAt}/>
                    </HStack>
                </VStack>

                {article?.blocks.map(renderArticleBlock)}
            </>
        )
    }

    return (
        <VStack gap={'16'} align={'start'} max className={classNames(cls.ArticleDetails, {}, [className])}>
            {content}
        </VStack>
    );
};
