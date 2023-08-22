import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextAlign, TextTheme} from "@/shared/ui/Text/Text";
import {Input} from "@/shared/ui/Input/Input";
import {Profile} from "@/entities/Profile";
import {Loader} from "@/shared/Loader/Loader";
import {Avatar} from "@/shared/ui/Avatar/Avatar";
import {CurrencySelect} from "@/entities/Currency";
import {Currency} from "@/entities/Currency/model/types/types";
import {Country} from "@/entities/Country/model/types/Country";
import {CountrySelect} from "@/entities/Country";
import {HStack, VStack} from "@/shared/ui/Stack";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string | undefined;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCountry?: (value: Country) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        onChangeAge,
        onChangeCity,
        onChangeFirstname,
        onChangeLastname,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
        className,
        data,
        isLoading,
        error,
        readonly
    } = props

    const {t} = useTranslation('profile')

    if (isLoading) {
        return (
            <HStack
                justify={'center'}
                max
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader/>
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                max
                justify={'center'}
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </HStack>
        )
    }

    const mods: Mods = {
        [cls.editing]: !readonly
    }

    return (
        <HStack
            gap={'32'}
            justify={'center'}
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            <HStack justify={'center'} className={cls.avatarWrapper}>
                {data?.avatar && <Avatar alt={''} src={data?.avatar} size={300}/>}
            </HStack>

            <VStack align={'start'} gap={'8'} className={cls.inputsWrapper}>
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
                    onChange={onChangeCity}
                    value={data?.city}
                    placeholder={t('Город')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <Input
                    onChange={onChangeUsername}
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    readOnly={readonly}
                />
                <CurrencySelect
                    onChange={onChangeCurrency}
                    className={cls.input}
                    value={data?.currency}
                    readonly={readonly}
                />
                <CountrySelect
                    onChange={onChangeCountry}
                    className={cls.input}
                    value={data?.country}
                    readonly={readonly}
                />
                <Input
                    onChange={onChangeAvatar}
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    className={cls.input}
                    readOnly={readonly}
                />
            </VStack>
        </HStack>
    );
};
