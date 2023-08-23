import {classNames} from "@/shared/lib/classNames/classNames";
import {Page} from "@/widgets/Page/Page";
import {VStack} from "@/shared/ui/Stack";
import {EditableProfileCard, EditableProfileCardHeader} from "@/features/editableProfileCard";
import {useParams} from "react-router-dom";
import {Text, TextTheme} from "@/shared/ui/Text";

interface ProfilePageProps {
    className?: string;
}


const ProfilePage = ({className}: ProfilePageProps) => {

    const {id} = useParams<{ id: string }>()

    if (!id) {
        return <Text theme={TextTheme.ERROR} title={"Произошла непредвиденная ошибка"}/>
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap={'16'}>
                <EditableProfileCardHeader/>
                <EditableProfileCard id={id}/>
            </VStack>
        </Page>
    );
};

export default ProfilePage

