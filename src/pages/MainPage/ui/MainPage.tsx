import {useTranslation} from "react-i18next";
import {Counter} from "@/entities/Counter";
import {Page} from "@/widgets/Page/Page";
import {getFeatureFlags} from "@/shared/lib/features";

const MainPage = () => {
    const {t} = useTranslation('main')

    const isCounterEnabled = getFeatureFlags('isCounterEnabled')


    return (
        <Page data-testid={"MainPage"}>

            {t('Главная страница')}

            {isCounterEnabled && <Counter/>}

        </Page>
    );
};

export default MainPage;