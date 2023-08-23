import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {HStack} from "@/shared/ui/Stack";
import {Text} from "@/shared/ui/Text";
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {getProfileData} from "../../model/selectors/getProfileData/getProfileData";
import {profileActions} from "../../model/slice/profileSlice";
import {updateProfileData} from "../../model/services/updateProfileData/updateProfileData";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
    const {className} = props

    const {t} = useTranslation('profile')

    const readonly = useSelector(getProfileReadonly)

    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)

    const canEdit = authData?.id === profileData?.id

    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch]);

    return (
        <HStack max justify={'between'} className={classNames('', {}, [className])}>
            <Text title={t('Профиль')}/>
            {canEdit &&
                <>
                    {readonly ?
                        (
                            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                                {t('Редактировать')}
                            </Button>
                        ) :
                        (
                            <HStack gap={'8'}>
                                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                                    {t('Сохранить')}
                                </Button>
                                <Button theme={ButtonTheme.OUTLINE_RED}
                                        onClick={onCancelEdit}>
                                    {t('Отменить')}
                                </Button>
                            </HStack>
                        )
                    }
                </>
            }
        </HStack>
    );
});

