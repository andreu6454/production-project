import {CombinedState, configureStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {StateSchema, ThunkExtraArg} from "./StateSchema";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";
import {createReducerManager} from "app/providers/StoreProvider/config/reducerManager";
import {$api} from "shared/api/api";
import {scrollRestorationReducer} from "widgets/Page/ScrollRestoration";
import {rtkApi} from "shared/api/rtkApi";

export function createReduxStore(
    initialState?: StateSchema,
) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        scrollRestoration: scrollRestorationReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
    }


    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg
            }
        }).concat(rtkApi.middleware)
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']