import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer
} from "enteties/Profile";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {ProfilePageHeader} from "./ProfilePageHeader/ProfilePageHeader";
import {getProfileForm} from "enteties/Profile/model/selectors/getProfileForm/getProfileForm";
import {Country, Currency} from "shared/const/common";

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

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [dispatch])

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string) => {
        let regExp = /^[0-9]/
        if (regExp.test(value || '')) {
            dispatch(profileActions.updateProfile({age: Number(value)}))
        }
    }, [dispatch])

    const onChangeCountry = useCallback((value?: Country) => {
        dispatch(profileActions.updateProfile({country: value}))
    }, [dispatch])

    const onChangeCurrency = useCallback((value?: Currency) => {
        dispatch(profileActions.updateProfile({currency: value}))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={Reducers} name={'profile'} removeAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfilePageHeader/>
                <ProfileCard
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeCountry={onChangeCountry}
                    onChangeCurrency={onChangeCurrency}
                    data={form}
                    isLoading={isLoading} error={error}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
