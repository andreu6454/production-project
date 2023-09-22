import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserSchema} from "@/entities/User";
import {LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY} from "@/shared/const/localStorage";
import {setFeatureFlags} from "@/shared/lib/features";
import {saveJsonSettings} from "@/entities/User/model/services/saveJsonSettings";
import {JsonSettings} from "@/entities/User/model/types/jsonSettings";
import {initAuthData} from "@/entities/User/model/services/initAuthData";


const initialState: UserSchema = {
    _inited: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
            setFeatureFlags(action.payload.features)
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id))
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                action.payload.features?.isAppRedesigned ? 'new' : 'old'
            )
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                saveJsonSettings.fulfilled,
                (state, action: PayloadAction<JsonSettings>) => {
                    if (state.authData) {
                        state.authData.jsonSettings = action.payload
                    }
                })
            .addCase(
                initAuthData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.authData = action.payload
                    setFeatureFlags(action.payload.features)
                    state._inited = true
                })
            .addCase(
                initAuthData.rejected,
                (state) => {
                    state._inited = true
                })
    }
})

export const {actions: userActions} = userSlice

export const {reducer: userReducer} = userSlice


