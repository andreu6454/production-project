import {classNames} from "shared/lib/classNames/classNames";
import cls from './AddCommentForm.module.scss'
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useSelector} from "react-redux";
import {getAddCommentFormError, getAddCommentFormText} from "../../model/selectors/addCommentFormSelectors";
import {addCommentFormActions, addCommentFormReducer} from "../../model/slices/addCommentFromSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
}
const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {className, onSendComment} = props

    const {t} = useTranslation()

    const text = useSelector(getAddCommentFormText)
    const error = useSelector(getAddCommentFormError)

    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch])

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentTextChange('')
    }, [onSendComment, onCommentTextChange, text])

    return (
        <DynamicModuleLoader name={"addCommentForm"} reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    placeholder={t("Введите текст комментария")}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    onClick={onSendHandler}
                >
                    {t("Отправить")}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;