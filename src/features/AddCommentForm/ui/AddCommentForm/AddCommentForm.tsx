import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AddCommentForm.module.scss'
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Input as InputDeprecated} from "@/shared/ui/deprecated/Input";
import {Button as ButtonDeprecated} from "@/shared/ui/deprecated/Button";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useSelector} from "react-redux";
import {getAddCommentFormText} from "../../model/selectors/addCommentFormSelectors";
import {addCommentFormActions, addCommentFormReducer} from "../../model/slices/addCommentFromSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {Input} from "@/shared/ui/redesigned/Input";
import {Button} from "@/shared/ui/redesigned/Button";
import {Card} from "@/shared/ui/redesigned/Card";

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
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <Card max padding={'24'} border={'round'}>
                        <HStack
                            gap={'16'}
                            justify={'between'}
                            max
                            className={classNames('', {}, [className])}
                        >
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
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        justify={'between'}
                        max
                        className={classNames(cls.AddCommentForm, {}, [className])}
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t("Введите текст комментария")}
                            value={text}
                            onChange={onCommentTextChange}
                        />
                        <ButtonDeprecated
                            onClick={onSendHandler}
                        >
                            {t("Отправить")}
                        </ButtonDeprecated>
                    </HStack>
                }
            />

        </DynamicModuleLoader>
    );
});

export default AddCommentForm;