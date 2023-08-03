import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {profileReducer} from "enteties/Profile";

interface ProfilePageProps {
    className?: string;
}

const Reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = ({className}:ProfilePageProps) => {
    const {t} = useTranslation()

    return (
        <DynamicModuleLoader reducers={Reducers} name={'profile'} removeAfterUnmount>
            <div className={classNames(cls.ProfilePage,{},[className])}>
                {t("Profile page")}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
