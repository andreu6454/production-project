import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slices/articleDetailsSlice";
import {memo, useEffect} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import {ToggleFeatures} from "@/shared/lib/features";
import {
    ArticleDetailsDeprecated
} from "@/entities/Article/ui/ArticleDetails/ArticleDetailsDeprecated/ArticleDetailsDeprecated";
import {
    ArticleDetailsRedesign
} from "@/entities/Article/ui/ArticleDetails/ArticleDetailsRedesign/ArticleDetailsRedesign";

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
}


export const ArticleDetails
    = memo((props: ArticleDetailsProps) => {

    const {id} = props

    const dispatch = useAppDispatch()

    const isLoading = useSelector(getArticleDetailsIsLoading)

    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id]);


    return (
        <DynamicModuleLoader name={"articleDetails"} reducers={reducers} removeAfterUnmount={true}>
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <ArticleDetailsRedesign article={article} error={error} isLoading={isLoading}/>
                }
                off={
                    <ArticleDetailsDeprecated article={article} error={error} isLoading={isLoading}/>
                }
            />
        </DynamicModuleLoader>
    );
});
