import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import {ReactNode} from "react";
import {Portal} from "@/shared/ui/redesigned/Portal";
import {Overlay} from "@/shared/ui/redesigned/Overlay";
import {useModal} from "@/shared/lib/hooks/useModal/useModal";
import {toggleFeatures} from "@/shared/lib/features";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;



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
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, [className, toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls.modalNew,
                off: () => cls.modalOld
            })])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
