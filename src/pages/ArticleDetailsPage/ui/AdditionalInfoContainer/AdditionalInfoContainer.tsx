import {memo} from "react";
import {ArticleAdditionalInfo} from "@/widgets/ArticleAdditionalInfo";
import {Card} from "@/shared/ui/redesigned/Card";
import {useSelector} from "react-redux";
import {getArticleDetailsData} from "@/entities/Article";
import cls from './AdditionalInfoContainer.module.scss'
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";
import {getArticleDetailsIsLoading} from "@/entities/Article/model/selectors/articleDetails";

export const AdditionalInfoContainer = memo(() => {

    const article = useSelector(getArticleDetailsData)

    const isLoading = useSelector(getArticleDetailsIsLoading)

    if(isLoading){
        return (
            <Card padding={'24'} className={cls.card}>
                <VStack
                    align={'start'}
                    max
                    gap={'32'}
                >
                    <HStack gap={'8'}>
                        <Skeleton width={50} height={50} border={'50%'}/>
                        <Skeleton width={40} height={24} border={'20px'}/>
                        <Skeleton width={80} height={24} border={'20px'}/>
                    </HStack>
                    <Skeleton width={150} height={40} border={'20px'}/>
                    <Skeleton width={150} height={40} border={'20px'}/>


                    <Skeleton width={120} height={24} border={'20px'}/>
                </VStack>
            </Card>
        )
    }

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
