import {createAsyncThunk} from "@reduxjs/toolkit";
import i18n from "shared/config/i18n/i18n";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Profile} from "entities/Profile";
import {getProfileForm} from "entities/Profile/model/selectors/getProfileForm/getProfileForm";


export const updateProfileData =
    createAsyncThunk<Profile, void, ThunkConfig<string>>(
        'profile/updateProfileData',
        async (_, thunkAPI
        ) => {
            const {extra, dispatch, getState, rejectWithValue} = thunkAPI

            const formData = getProfileForm(getState())

            try {
                const response = await extra.api.put<Profile>('/profile', formData)

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )
