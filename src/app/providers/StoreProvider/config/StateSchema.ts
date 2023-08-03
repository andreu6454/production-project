import {CounterSchema} from "enteties/Counter";
import {UserSchema} from "enteties/User";
import {LoginSchema} from "features/AuthByUsername";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "enteties/Profile";


export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,

    // async reducers
    loginForm?: LoginSchema,
    profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManagerType {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerType
}