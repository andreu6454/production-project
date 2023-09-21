import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {Text as TextDeprecated} from "@/shared/ui/deprecated/Text";
import {Button as ButtonDeprecated, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {getProfileData} from "../../model/selectors/getProfileData/getProfileData";
import {profileActions} from "../../model/slice/profileSlice";
import {updateProfileData} from "../../model/services/updateProfileData/updateProfileData";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";
import {Button} from "@/shared/ui/redesigned/Button";

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
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <Text title={t('Профиль')}/>
                }
                off={
                    <TextDeprecated title={t('Профиль')}/>
                }
            />

            {canEdit &&
                <>
                    {readonly ?
                        (
                            <ToggleFeatures
                                feature={'isAppRedesigned'}
                                on={
                                    <Button variant={'outline'} onClick={onEdit}>
                                        {t('Редактировать')}
                                    </Button>
                                }
                                off={
                                    <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                }
                            />

                        ) :
                        (
                            <ToggleFeatures
                                feature={'isAppRedesigned'}
                                on={
                                    <HStack gap={'8'}>
                                        <Button variant={'outline'} onClick={onSave}>
                                            {t('Сохранить')}
                                        </Button>
                                        <Button
                                            color={'error'}
                                            variant={'outline'}
                                            onClick={onCancelEdit}
                                        >
                                            {t('Отменить')}
                                        </Button>
                                    </HStack>
                                }
                                off={
                                    <HStack gap={'8'}>
                                        <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={onSave}>
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated theme={ButtonTheme.OUTLINE_RED}
                                                          onClick={onCancelEdit}>
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                }
                            />
                        )
                    }
                </>
            }
        </HStack>
    );
});

