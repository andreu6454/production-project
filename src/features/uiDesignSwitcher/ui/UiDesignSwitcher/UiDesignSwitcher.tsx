import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useState} from 'react';
import {ListBox} from "@/shared/ui/redesigned/Popups";
import {getFeatureFlags, updateFeatureFlag} from "@/shared/lib/features";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton";

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const {className} = props;
    const {t} = useTranslation();

    const dispatch = useAppDispatch()

    const authData = useSelector(getUserAuthData)
    const isAppRedesigned = getFeatureFlags('isAppRedesigned')

    const [isLoading, setIsLoading] = useState(false)

    const items = [
        {
            content: t('Новый'),
            value: 'new'
        },
        {
            content: t('Старый'),
            value: 'old'
        }
    ]

    const onChange = async (value: string) => {
        if (authData?.id) {
            setIsLoading(true)
            await dispatch(updateFeatureFlag({
                userId: authData.id,
                newFeatures: {
                    isAppRedesigned: value === 'new',
                }
            })).unwrap();
            setIsLoading(false)
        }
    }

    return (
        <HStack>
            <Text text={t('Вариант интерфейса')}/>
            {isLoading ? (
                    <Skeleton width={121} height={32} border={'8px'}/>
                ) :
                (
                    <ListBox
                        onChange={onChange}
                        value={isAppRedesigned ? 'new' : 'old'}
                        items={items}
                        className={classNames('', {}, [className])}
                    />
                )
            }
        </HStack>
    );
});