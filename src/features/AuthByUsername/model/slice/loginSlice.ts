import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginSchema} from "@/features/AuthByUsername/model/types/loginSchema";
import {loginByUserName} from "../services/loginByUserName/loginByUserName";


const initialState: LoginSchema = {
    isLoading: false,
    username: "",
    password: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUserName.pending, (state) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(loginByUserName.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUserName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export const {actions: loginActions} = loginSlice

export const {reducer: loginReducer} = loginSlice