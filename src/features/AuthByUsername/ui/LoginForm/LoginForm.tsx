import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Input} from "shared/ui/Input/Input";
import {useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {loginActions, loginReducer} from "../../model/slice/loginSlice";
import {loginByUserName} from "../../model/services/loginByUserName/loginByUserName";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const {t} = useTranslation()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)


    const dispatch = useAppDispatch()

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])
    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUserName({username, password}))
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess()
        }
    }, [dispatch, username, password])


    return (
        <DynamicModuleLoader removeAfterUnmount name={'loginForm'} reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t("Форма авторизации")}/>
                {error && <Text text={error} theme={TextTheme.ERROR}/>}
                <Input onChange={onChangeUsername}
                       autoFocus={true}
                       className={cls.input}
                       type={"text"}
                       placeholder={t('Введите username')}
                       value={username}
                />
                <Input
                    onChange={onChangePassword}
                    className={cls.input}
                    type={"text"}
                    placeholder={t('Введите пароль')}
                    value={password}
                />
                <Button
                    onClick={onLoginClick}
                    theme={ButtonTheme.OUTLINE}
                    className={cls.btn}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>

            </div>
        </DynamicModuleLoader>
    );
});


export default LoginForm