import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Icon.module.scss'
import {memo, SVGProps, VFC} from "react";


type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconBaseProps extends IconBaseProps {
    clickable?: false
}

interface ClickableIconBaseProps extends IconBaseProps {
    clickable: true
    onClick: () => void;
}

type IconProps = NonClickableIconBaseProps | ClickableIconBaseProps

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props


    const icon = (
        <Svg
            width={width}
            height={height}
            className={classNames(cls.Icon, {}, [className])}
            {...otherProps}
            onClick={undefined}
        />
    )

    if (clickable) {
        return (
            <button
                className={cls.button}
                type={'button'}
                onClick={props.onClick}
                style={{height, width}}
            >
                {icon}
            </button>
        )
    }

    return icon;
});
