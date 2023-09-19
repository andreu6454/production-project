import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Country} from "../../model/types/Country";
import {ListBox as ListBoxDeprecated} from "@/shared/ui/deprecated/Popups";
import {ToggleFeatures} from "@/shared/lib/features";
import {ListBox} from "@/shared/ui/redesigned/Popups";

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

export const CountrySelect = memo(
    ({className, value, onChange, readonly}: CountrySelectProps) => {
        const {t} = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        const props = {
            className,
            value,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top-right' as const,
        };

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    },
);
