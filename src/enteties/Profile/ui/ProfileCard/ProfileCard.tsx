import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Profile} from "enteties/Profile";
import {Loader} from "shared/Loader/Loader";
import {Country, Currency} from "shared/const/common";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string | undefined;
    onChangeFirstname: (value?: string) => void;
    onChangeLastname: (value?: string) => void;
    onChangeAge: (value?: string) => void;
    onChangeCountry: (value?: Country) => void;
    onChangeCity: (value?: string) => void;
    onChangeCurrency: (value?: Currency) => void;
    readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        onChangeAge,
        onChangeCity,
        className,
        data,
        isLoading,
        error,
        onChangeFirstname,
        onChangeLastname,
        readonly
    } = props

    const {t} = useTranslation('profile')

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader/>
            </div>
        )
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </div>
        )
    }
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.data}>
                <Input
                    onChange={onChangeFirstname}
                    value={data?.first}
                    placeholder={t('Имя')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <Input
                    onChange={onChangeLastname}
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <Input
                    onChange={onChangeAge}
                    value={data?.age + ''}
                    placeholder={t('Возраст')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <Input
                    value={data?.country}
                    placeholder={t('Страна')}
                    className={cls.input}
                    readOnly={true}
                />
                <Input
                    onChange={onChangeCity}
                    value={data?.city}
                    placeholder={t('Город')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <Input
                    value={data?.currency}
                    placeholder={t('Валюта')}
                    className={cls.input}
                    readOnly={true}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    readOnly={true}
                />
            </div>
        </div>
    );
};
