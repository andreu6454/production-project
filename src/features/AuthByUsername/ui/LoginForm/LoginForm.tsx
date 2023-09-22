import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button as ButtonDeprecated, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {Input as InputDeprecated} from "@/shared/ui/deprecated/Input";
import {useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {loginActions, loginReducer} from "../../model/slice/loginSlice";
import {loginByUserName} from "../../model/services/loginByUserName/loginByUserName";
import {Text as TextDeprecated, TextTheme} from "@/shared/ui/deprecated/Text";
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";
import {Input} from "@/shared/ui/redesigned/Input";
import {Button} from "@/shared/ui/redesigned/Button";
import {useForceUpdate} from "@/shared/lib/render/forceUpdate";

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

    const forceUpdate = useForceUpdate()

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
            forceUpdate()
        }
    }, [dispatch, username, password])


    return (
        <DynamicModuleLoader removeAfterUnmount name={'loginForm'} reducers={initialReducers}>
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <VStack
                        align={'start'}
                        max
                        gap={'8'}
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <VStack max gap={'8'}>
                            <Text title={t("Форма авторизации")}/>
                            {error && <Text text={error} variant={'error'}/>}
                            <Input
                                onChange={onChangeUsername}
                                autoFocus={true}
                                className={cls.input}
                                type={"text"}
                                placeholder={t('Введите username')}
                                value={username}
                            />
                            <Input
                                onChange={onChangePassword}
                                className={cls.input}
                                type={"password"}
                                placeholder={t('Введите пароль')}
                                value={password}
                            />
                        </VStack>
                        <Button
                            onClick={onLoginClick}
                            variant={'outline'}
                            className={cls.btn}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>

                    </VStack>
                }
                off={
                    <VStack
                        align={'start'}
                        max
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <TextDeprecated title={t("Форма авторизации")}/>
                        {error && <TextDeprecated text={error} theme={TextTheme.ERROR}/>}
                        <InputDeprecated onChange={onChangeUsername}
                                         autoFocus={true}
                                         className={cls.input}
                                         type={"text"}
                                         placeholder={t('Введите username')}
                                         value={username}
                        />
                        <InputDeprecated
                            onChange={onChangePassword}
                            className={cls.input}
                            type={"text"}
                            placeholder={t('Введите пароль')}
                            value={password}
                        />
                        <ButtonDeprecated
                            onClick={onLoginClick}
                            theme={ButtonTheme.OUTLINE}
                            className={cls.btn}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>

                    </VStack>
                }
            />
        </DynamicModuleLoader>
    );
});


export default LoginForm