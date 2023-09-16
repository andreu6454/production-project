import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppLink.module.scss'
import {LinkProps, NavLink} from "react-router-dom";
import {FC, memo} from "react";


export type AppLinkTheme = 'primary' | "secondary"

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkTheme;
    activeClassName?: string;
}


export const AppLink: FC<AppLinkProps> = memo((props) => {

    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props
    return (
        <NavLink
            to={to}
            className={({isActive}) => classNames(
                cls.AppLink, {[activeClassName]: isActive}, [className, cls[variant]]
            )}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
