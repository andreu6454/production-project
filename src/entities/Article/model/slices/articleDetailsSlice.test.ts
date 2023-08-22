import {DeepPartial} from "@reduxjs/toolkit";
import {articleDetailsReducer} from "@/entities/Article/model/slices/articleDetailsSlice";
import {ArticleDetailsSchema} from "@/entities/Article";
import {fetchArticleById} from "@/entities/Article/model/services/fetchArticleById/fetchArticleById";

describe('articleDetailsSlice.test', () => {

    test('test fetch article service pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: "error",
        }

        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.pending
        )).toEqual({
            isLoading: true,
            error: undefined
        })
    })
})