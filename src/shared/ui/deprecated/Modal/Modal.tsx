import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import {ReactNode} from "react";
import {Portal} from "@/shared/ui/deprecated/Portal";
import {Overlay} from "@/shared/ui/deprecated/Overlay";
import {useModal} from "@/shared/lib/hooks/useModal/useModal";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;


/**
 * Устарел, используем новые компонент из папки redesigned
 * @deprecated
 */
export const Modal = (props: ModalProps) => {

    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props

    const {
        close,
        isClosing,
        isMounted
    } = useModal({animationDelay: ANIMATION_DELAY, onClose, isOpen})

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};