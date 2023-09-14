import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import i18n from "@/shared/config/i18n/i18n";
import {JsonSettings} from "../types/jsonSettings";
import {getJsonSettings} from "../selectors/jsonSettings";
import {setJsonSettingsMutation} from "../api/userApi";
import {getUserAuthData} from "../selectors/getUserAuthData/getUserAuthData";

export const saveJsonSettings =
    createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
        'user/saveJsonSettings',
        async (newJsonSettings, thunkAPI
        ) => {

            const {dispatch, rejectWithValue, getState} = thunkAPI

            const userData = getUserAuthData(getState())
            const currentSettings = getJsonSettings(getState())

            if (!userData) {
                return rejectWithValue(i18n.t('error'))
            }

            try {
                const response = await dispatch(setJsonSettingsMutation({
                    userId: userData.id,
                    jsonSettings: {
                        ...currentSettings,
                        ...newJsonSettings
                    }
                })).unwrap()

                if (!response.jsonSettings) {
                    return rejectWithValue(i18n.t('error'))
                }

                return response.jsonSettings

            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )

