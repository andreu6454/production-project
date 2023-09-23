import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {Avatar} from "@/shared/ui/redesigned/Avatar";
import {Input} from "@/shared/ui/redesigned/Input";
import {CurrencySelect} from "@/entities/Currency";
import {CountrySelect} from "@/entities/Country";
import {Profile} from "../../../model/types/profile";
import {Country} from "@/entities/Country/model/types/Country";
import {Currency} from "@/entities/Currency/model/types/types";
import {Card} from "@/shared/ui/redesigned/Card";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";

interface ProfileCardRedesignedProps {
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

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card max padding={'24'} border={'partial'}>
            <VStack max gap={'32'}>
                <HStack max align={'center'} justify={'center'}>
                    <Skeleton border={'50%'} width={128} height={128}/>
                </HStack>
                <HStack max gap={'24'}>
                    <VStack max gap={'16'}>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                    </VStack>

                    <VStack max gap={'16'}>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                        <Skeleton width={'100%'} height={38}/>
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    )
}

export const ProfileCardRedesigned = (props: ProfileCardRedesignedProps) => {
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
            <ProfileCardRedesignedSkeleton/>

        )
    }

    if (error) {
        return (
            <HStack
                max
                justify={'center'}
                className={classNames('', {}, [className])}
            >
                <Text
                    variant={'error'}
                    align={'center'}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </HStack>
        )
    }


    return (
        <Card
            data-testid={"ProfileCard"}
            padding={'24'}
            border={'squared'}
            max
            className={classNames('', {}, [className])}
        >
            <VStack max align={'start'} gap={'32'}>
                <HStack max align={'center'} justify={'center'}>
                    {data?.avatar && <Avatar alt={''} src={data?.avatar} size={128}/>}
                </HStack>
                <HStack max gap={'24'}>
                    <VStack max gap={'16'} align={'start'}>
                        <Input
                            data-testId={"ProfileCard.firstname"}
                            onChange={onChangeFirstname}
                            value={data?.first}
                            label={t('Имя')}
                            readOnly={readonly}
                        />
                        <Input
                            onChange={onChangeLastname}
                            value={data?.lastname}
                            label={t('Фамилия')}
                            readOnly={readonly}
                        />
                        <Input
                            onChange={onChangeAge}
                            value={data?.age + ''}
                            label={t('Возраст')}
                            readOnly={readonly}
                        />
                        <Input
                            onChange={onChangeCity}
                            value={data?.city}
                            label={t('Город')}
                            readOnly={readonly}
                        />
                    </VStack>
                    <VStack max gap={'16'} align={'start'}>
                        <Input
                            onChange={onChangeUsername}
                            value={data?.username}
                            label={t('Username')}
                            readOnly={readonly}
                        />
                        <Input
                            onChange={onChangeAvatar}
                            value={data?.avatar}
                            label={t('Ccылка на аватар')}
                            readOnly={readonly}
                        />
                        <CurrencySelect
                            onChange={onChangeCurrency}
                            value={data?.currency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            onChange={onChangeCountry}
                            value={data?.country}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    )
};
