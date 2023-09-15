import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './CountrySelect.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Country} from "../../model/types/Country";
import {ListBox} from "@/shared/ui/deprecated/Popups";
interface CountrySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Country) => void;
    readonly?: boolean
}

const options = [
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Ukraine, content: Country.Ukraine},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
]
export const CountrySelect = memo((props: CountrySelectProps) => {

    const {
        readonly,
        className,
        value,
        onChange
    } = props

    const {t} = useTranslation()

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [])


    return (
        <ListBox
            value={value}
            defaultValue={t('Укажите страну')}
            items={options}
            className={classNames(cls.CurrencySelect, {}, [className])}
            onChange={onChangeHandler}
            readonly={readonly}
            direction={'top-right'}
            label={t('Укажите страну')}
        />
    )
});