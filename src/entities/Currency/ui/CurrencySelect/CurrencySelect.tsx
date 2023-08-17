import {classNames} from "shared/lib/classNames/classNames";
import cls from './CurrencySelect.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Currency} from "entities/Currency/model/types/types";
import {ListBox} from "shared/ui/Popups/";

interface CurrencySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
    readonly?: boolean
}

const options = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD},
]
export const CurrencySelect = memo((props: CurrencySelectProps) => {

    const {
        readonly,
        className,
        value,
        onChange
    } = props

    const {t} = useTranslation()

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [])


    return (
        <ListBox
            value={value}
            defaultValue={t('Укажите валюту')}
            items={options}
            className={classNames(cls.CurrencySelect, {}, [className])}
            onChange={onChangeHandler}
            readonly={readonly}
            direction={'top-right'}
            label={t('Укажите валюту')}
        />
    )
});
