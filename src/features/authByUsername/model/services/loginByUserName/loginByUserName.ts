import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "@/entities/User";
import i18n from "@/shared/config/i18n/i18n";
import {ThunkConfig} from "@/app/providers/StoreProvider";

interface LoginByUserNameProps {
    username: string,
    password: string
}

export const loginByUserName =
    createAsyncThunk<User, LoginByUserNameProps, ThunkConfig<string>>(
        'login/loginByUserName',
        async (authData, thunkAPI
        ) => {

            const {extra, dispatch, rejectWithValue} = thunkAPI
            try {
                const response = await extra.api.post('/login', authData)
                if (!response.data) {
                    throw new Error()
                }


                dispatch(userActions.setAuthData(response.data))

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'))
            }
        }
    )

