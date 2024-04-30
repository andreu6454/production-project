import {useTranslation} from "react-i18next";
import {Page} from "@/widgets/Page/Page";
import {Suggestions} from "../Suggestions/Suggestions";
import {Text} from "@/shared/ui/redesigned/Text";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Card} from "@/shared/ui/redesigned/Card";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";

const MainPage = () => {
    const {t} = useTranslation('main')

    const userData = useSelector(getUserAuthData)
    return (
        <Page data-testid="MainPage">
            <VStack gap={'32'} max>
                <Text size={'l'} bold title={t('Главная страница')}/>
                <Card max padding={'24'} border={'partial'} variant={"light"}>
                    {
                        userData ?
                            <VStack max gap={'16'}>
                                <Text size={'m'} title={t('Мои приложения')}/>
                                <Suggestions/>
                            </VStack> :
                            <Text
                                title={t("Пожалуйста авторизуйтесь")}
                                text={t("Часть контента недоступна неавторизованным пользователям!")}
                            />
                    }
                </Card>
            </VStack>
        </Page>
    );
};

export default MainPage;