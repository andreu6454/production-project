import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Input} from "shared/ui/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {memo, useCallback} from "react";
import {loginActions} from "../../model/slice/loginSlice";
import {getLoginState} from "../../model/selectors/getLoginState";
import {loginByUserName} from "../../model/services/loginByUserName/loginByUserName";
import {Text, TextTheme} from "shared/ui/Text/Text";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({className}: LoginFormProps) => {
    const {t} = useTranslation()
    const {username, password, isLoading, error} = useSelector(getLoginState)

    const dispatch = useDispatch()

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])
    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName({username, password}))
    }, [dispatch, username, password])


    return (
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
    );
});
