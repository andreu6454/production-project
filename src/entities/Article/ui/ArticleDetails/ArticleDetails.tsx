import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slices/articleDetailsSlice";
import {memo, useCallback, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import {Text, TextAlign, TextSize, TextTheme} from "shared/ui/Text/Text";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {Avatar} from "shared/ui/Avatar/Avatar";

import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import {Icon} from "shared/ui/Icon/Icon";
import {ArticleBlock, ArticleBlockType} from "../../model/types/article";
import {ArticleCodeBlockComponent} from "entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import {ArticleImageBlockComponent} from "entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent";
import {ArticleTextBlockComponent} from "entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import {HStack, VStack} from "shared/ui/Stack";

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
}


export const ArticleDetails
    = memo((props: ArticleDetailsProps) => {

    const {className, id} = props

    const {t} = useTranslation('article-details')
    const dispatch = useAppDispatch()

    const isLoading = useSelector(getArticleDetailsIsLoading)

    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block}/>
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block}/>;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>;
            default:
                return null;
        }
    }, [])

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id]);


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

                {article?.blocks.map(renderBlock)}
            </>
        )
    }


    return (
        <DynamicModuleLoader name={"articleDetails"} reducers={reducers} removeAfterUnmount={true}>
            <VStack gap={'16'} align={'start'} max className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
