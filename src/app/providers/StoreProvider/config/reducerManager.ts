import {AnyAction, combineReducers, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {MountedReducers, ReducerManagerType, StateSchema, StateSchemaKey} from "./StateSchema";


export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManagerType {
    const reducers = {...initialReducers}

    let combinedReducer = combineReducers(reducers)

    let keysToRemove: Array<StateSchemaKey> = []

    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReduces: () => mountedReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = {...state}
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            mountedReducers[key] = true
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]

            keysToRemove.push(key)
            mountedReducers[key] = false
            combinedReducer = combineReducers(reducers)
        }
    }
}
