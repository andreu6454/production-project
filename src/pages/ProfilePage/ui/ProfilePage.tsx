import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {fetchProfileData, ProfileCard, profileReducer} from "enteties/Profile";
import {useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageProps {
    className?: string;
}

const Reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={Reducers} name={'profile'} removeAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfileCard/>
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
