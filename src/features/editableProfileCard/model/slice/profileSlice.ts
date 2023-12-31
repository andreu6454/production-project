import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Profile} from "@/entities/Profile";
import {ProfileSchema} from "@/features/editableProfileCard";
import {fetchProfileData} from "../services/fetchProfileData/fetchProfileData";
import {updateProfileData} from "../services/updateProfileData/updateProfileData";


const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined
}

export const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
            state.validateErrors = []
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.data,
                ...action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.form = action.payload
                    state.data = action.payload
                })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true
                state.validateErrors = []
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.form = action.payload
                    state.data = action.payload
                    state.readonly = true
                    state.validateErrors = []
                })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload
            })
    }
})

export const {actions: profileActions} = profileSlice

export const {reducer: profileReducer} = profileSlice

