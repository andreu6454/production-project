import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer
} from "entities/Profile";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {ProfilePageHeader} from "./ProfilePageHeader/ProfilePageHeader";
import {getProfileForm} from "entities/Profile/model/selectors/getProfileForm/getProfileForm";
import {Currency} from "entities/Currency/model/types/types";
import {Country} from "entities/Country/model/types/Country";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {useParams} from "react-router-dom";
import {Page} from "widgets/Page/Page";

interface ProfilePageProps {
    className?: string;
}

const Reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const dispatch = useAppDispatch()

    const form = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const isLoading = useSelector(getProfileIsLoading)
    const validateErrors = useSelector(getProfileValidateErrors)

    const {id} = useParams<{ id: string }>()


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

    const onChangeAge = useCallback((value?: string) => {
        let regExp = /^[0-9]/
        if (regExp.test(value || '')) {
            dispatch(profileActions.updateProfile({age: Number(value)}))
        }
    }, [dispatch])


    return (
        <DynamicModuleLoader reducers={Reducers} name={'profile'} removeAfterUnmount>
            <Page className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfilePageHeader/>
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
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage

