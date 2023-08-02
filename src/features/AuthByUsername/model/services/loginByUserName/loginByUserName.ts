import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import {User, userActions} from "enteties/User";
import i18n from "shared/config/i18n/i18n";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";

interface LoginByUserNameProps {
    username: string,
    password: string
}

export const loginByUserName =
    createAsyncThunk<User, LoginByUserNameProps, { rejectValue: string }>(
        'login/loginByUserName',
        async (authData, thunkApi) => {
            try {
                const response = await axios.post('http://localhost:8000/login', authData)
                if (!response.data) {
                    throw new Error()
                }

                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
                thunkApi.dispatch(userActions.setAuthData(response.data))

                return response.data
            } catch (e) {
                console.log(e)
                return thunkApi.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'))
            }
        }
    )

