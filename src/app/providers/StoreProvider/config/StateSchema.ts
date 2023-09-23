import {CounterSchema} from "@/entities/Counter";
import {UserSchema} from "@/entities/User";
import {LoginSchema} from "src/features/authByUsername";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {AxiosInstance} from "axios";
import {To} from "react-router-dom";
import {NavigateOptions} from "react-router";
import {ArticleDetailsSchema} from "@/entities/Article";
import {ArticleDetailsPageSchema} from "@/pages/ArticleDetailsPage";
import {AddCommentFormSchema} from "src/features/addCommentForm";
import {ArticlePageSchema} from "@/pages/ArticlesPage";
import {scrollRestorationSchema} from "@/widgets/Page/ScrollRestoration";
import {rtkApi} from "@/shared/api/rtkApi";
import {ProfileSchema} from "@/features/editableProfileCard";


export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,
    scrollRestoration: scrollRestorationSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // async reducers
    loginForm?: LoginSchema,
    profile?: ProfileSchema,
    articleDetails?: ArticleDetailsSchema,
    addCommentForm?: AddCommentFormSchema,
    articlesPage?: ArticlePageSchema,
    articleDetailsPage?: ArticleDetailsPageSchema

}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManagerType {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    getMountedReduces: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerType
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg,
    state: StateSchema
}