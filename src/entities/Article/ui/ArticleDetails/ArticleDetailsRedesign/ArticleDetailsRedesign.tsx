import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";
import cls from "../ArticleDetails.module.scss";
import {Text} from "@/shared/ui/redesigned/Text";
import {renderArticleBlock} from "../renderArticleBlock";
import {Article} from "../../../model/types/article";
import {AppImage} from "@/shared/ui/redesigned/AppImage";

interface ArticleDetailsRedesignProps {
    className?: string;
    article?: Article;
    isLoading?: boolean;
    error?: string;
}

export const ArticleDetailsRedesign = (props: ArticleDetailsRedesignProps) => {
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
                align={'center'}
                variant={'error'}
                title={t("Произошла ошибка при загрузке статьи")}
            />
        )
    } else {
        content = (
            <>
            <Text
                bold
                size={'l'}
                title={article?.title}
            />
            <Text
                size={'l'}
                title={article?.subtitle}
            />
            <AppImage
                src={article?.img}
                fallback={<Skeleton width={'100%'} height={420} border={'16px'}/>}
                className={cls.img}
            />

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
