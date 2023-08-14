import {classNames} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {ChangeEvent, useMemo} from "react";

export interface SelectOption <T extends string>{
    value: T;
    content: string
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[]
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {

    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange
    } = props

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T)
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
};
