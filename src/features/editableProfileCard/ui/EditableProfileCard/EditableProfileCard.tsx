import {classNames} from '@/shared/lib/classNames/classNames';
import {memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {Currency} from "@/entities/Currency/model/types/types";
import {Country} from "@/entities/Country/model/types/Country";
import {Text, TextTheme} from "@/shared/ui/deprecated/Text";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {getProfileForm} from "../../model/selectors/getProfileForm/getProfileForm";
import {getProfileError} from "../../model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {getProfileIsLoading} from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileValidateErrors} from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {fetchProfileData} from "../../model/services/fetchProfileData/fetchProfileData";
import {profileActions, profileReducer} from "../../model/slice/profileSlice";
import {ProfileCard} from "@/entities/Profile";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const Reducers: ReducersList = {
    profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const {className, id} = props;

    const dispatch = useAppDispatch()

    const form = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const isLoading = useSelector(getProfileIsLoading)
    const validateErrors = useSelector(getProfileValidateErrors)


    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    }, [dispatch, id]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [dispatch])

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [dispatch])

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({currency: value}))
    }, [dispatch])

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.updateProfile({country: value}))
    }, [dispatch])

    const onChangeAge = useCallback((value: string) => {
        if (!!Number(value)) {
            dispatch(profileActions.updateProfile({age: Number(value)}))
        } else if (value === '') {
            dispatch(profileActions.updateProfile({age: 0}))
        }
    }, [dispatch])

    return (
        <DynamicModuleLoader name={"profile"} reducers={Reducers} removeAfterUnmount>
            <VStack
                max
                align={'start'}
                className={classNames('', {}, [className])}>
                {
                    !!validateErrors?.length && validateErrors.map(err => (
                        <Text key={err} theme={TextTheme.ERROR} text={err}/>
                    ))
                }
                <ProfileCard
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    data={form}
                    isLoading={isLoading}
                    error={error}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});