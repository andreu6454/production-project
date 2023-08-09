import {createAsyncThunk} from "@reduxjs/toolkit";
import i18n from "shared/config/i18n/i18n";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Profile} from "entities/Profile";


export const fetchProfileData =
    createAsyncThunk<Profile, string, ThunkConfig<string>>(
        'profile/fetchProfileData',
        async (profileId, thunkAPI
        ) => {

            const {extra, dispatch, rejectWithValue} = thunkAPI
            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`)

                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )

