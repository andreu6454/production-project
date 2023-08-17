import {StoreProvider} from "./ui/StoreProvider";
import {createReduxStore} from "./config/store";
export type {AppDispatch} from './config/store'
import type {StateSchema, ReduxStoreWithManager, ThunkConfig} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    ThunkConfig
}