import {classNames} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {ChangeEvent, memo, useMemo} from "react";

export interface SelectOption {
    value: string;
    content: string
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[]
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {

    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange
    } = props

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option key={opt.value} className={cls.option} value={opt.value}>
                {opt.content}
            </option>
        ))
    }, [options])


    return (
        <div className={classNames(cls.wrapper, {[cls.readonly]: readonly}, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandle}
                className={cls.select}
            >
                {optionList}
            </select>
        </div>
    );
});
