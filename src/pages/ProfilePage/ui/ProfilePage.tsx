import {classNames} from "@/shared/lib/classNames/classNames";
import {Page} from "@/widgets/Page/Page";
import {VStack} from "@/shared/ui/Stack";
import {EditableProfileCard, EditableProfileCardHeader} from "@/features/editableProfileCard";
import {useParams} from "react-router-dom";
import {Text, TextTheme} from "@/shared/ui/Text";
import {ProfileRating} from "@/features/profileRating";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";

interface ProfilePageProps {
    className?: string;
}


const ProfilePage = ({className}: ProfilePageProps) => {

    const {id} = useParams<{ id: string }>()
    const userData = useSelector(getUserAuthData)

    if (!id) {
        return <Text theme={TextTheme.ERROR} title={"Произошла непредвиденная ошибка"}/>
    }

    return (
        <Page data-testid={'ProfilePage'} className={classNames('', {}, [className])}>
            <VStack max gap={'16'}>
                <EditableProfileCardHeader/>
                <EditableProfileCard id={id}/>
                {userData?.id !== id && <ProfileRating profileId={id}/>}
            </VStack>
        </Page>
    );
};

export default ProfilePage

