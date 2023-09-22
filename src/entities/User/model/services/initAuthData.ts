import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {User} from "../types/userSchema";
import i18n from "@/shared/config/i18n/i18n";
import {getUserDataByIdQuery} from "../api/userApi";
import {LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY} from "@/shared/const/localStorage";

export const initAuthData =
    createAsyncThunk<User, void, ThunkConfig<string>>(
        'user/initAuthData',
        async (_,thunkAPI
        ) => {

            const {dispatch, rejectWithValue} = thunkAPI

            const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)?.slice(1,-1);

            if (!userId) {
                return rejectWithValue(i18n.t('error'))
            }

            try {
                const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

                localStorage.setItem(
                    LOCAL_STORAGE_LAST_DESIGN_KEY,
                    response.features?.isAppRedesigned ? 'new' : 'old'
                )
                return response

            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )
