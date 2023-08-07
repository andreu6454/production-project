import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Profile} from "entities/Profile";
import {getProfileForm} from "entities/Profile/model/selectors/getProfileForm/getProfileForm";
import {validateProfileData} from "entities/Profile/model/services/validateProfile/validateProfileData";
import {ValidateProfileError} from "entities/Profile/model/types/profile";


export const updateProfileData =
    createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
        'profile/updateProfileData',
        async (_, thunkAPI
        ) => {
            const {extra, dispatch, getState, rejectWithValue} = thunkAPI

            const formData = getProfileForm(getState())

            const errors = validateProfileData(formData)

            if (errors.length) {
                return rejectWithValue(errors)
            }

            try {
                const response = await extra.api.put<Profile>('/profile', formData)

                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue([ValidateProfileError.SERVER_ERROR])
            }
        }
    )
