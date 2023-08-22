import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal";
import {Suspense} from "react";
import {LoginFormAsync} from "@/features/AuthByUsername/ui/LoginForm/LoginForm.async";
import {Loader} from "@/shared/Loader/Loader";

interface LoginModalProps {
    className?: string;
    isOpen: boolean,
    onClose: () => void
}

export const LoginModal = ({className, isOpen, onClose}: LoginModalProps) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
            lazy={true}
        >
            <Suspense fallback={<Loader/>}>
                <LoginFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
};
