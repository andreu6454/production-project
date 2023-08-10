import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {Article, ArticleView} from "entities/Article";
import {ArticlePageSchema} from "pages/ArticlesPage";
import {fetchArticlesList} from "../services/fetchArticlesList/fetchArticlesList";
import {ARTICLE_VIEW_LOCALSTORAGE_KEY} from "shared/const/localStorage";


const articlesAdapter = createEntityAdapter<Article>({
    selectId: article => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
)

export const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.BIG,
        page: 1,
        hasMore: true,
        _inited:false
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        initState: state => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView
            state.view = view
            state.limit = view === ArticleView.BIG ? 4 : 9
            state._inited = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(fetchArticlesList.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    articlesAdapter.addMany(state, action.payload)
                    state.hasMore = action.payload.length > 0
                })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export const {actions: articlePageActions} = articlePageSlice

export const {reducer: articlePageReducer} = articlePageSlice