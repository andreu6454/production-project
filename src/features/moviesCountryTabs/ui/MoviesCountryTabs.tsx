import {memo, useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Text} from "@/shared/ui/redesigned/Text";
import {classNames} from "@/shared/lib/classNames/classNames";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {TabItem, Tabs} from "@/shared/ui/redesigned/Tabs";

interface MoviesCountryTabsProps {
    className?: string;
    country?: string;
    onChangeCountry?: (country: string) => void
}

export const MoviesCountryTabs = memo((props: MoviesCountryTabsProps) => {
    const {className,onChangeCountry,country} = props
    const {t} = useTranslation('movies')


    const countryOptions = useMemo(() => [
        {
            value: 'Россия',
            content: t('Россия')
        },
        {
            value: 'СССР',
            content: t('СССР')
        },
        {
            value: 'США',
            content: t('США')
        },
        {
            value: 'Италия',
            content: t('Италия')
        },
        {
            value: 'Франция',
            content: t('Франция')
        },

    ], [t])

    const onCountryClick = useCallback((tab: TabItem) => {
        onChangeCountry?.(tab.value)
    }, [onChangeCountry])

    return (
        <VStack gap={'8'}>
            <Text title={t('Страны')}/>
            <Tabs
                direction={"row"}
                align={'start'}
                tabs={countryOptions}
                value={country || ''}
                onTabClick={onCountryClick}
                className={classNames('', {}, [className])}
            />
        </VStack>
    );
});
