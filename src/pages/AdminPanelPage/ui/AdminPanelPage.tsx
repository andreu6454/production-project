import {useTranslation} from "react-i18next";
import {Page} from "widgets/Page/Page";

const AdminPanelPage = () => {
    const {t} = useTranslation('')
    return (
        <Page>
            Админ панель
        </Page>
    );
};

export default AdminPanelPage;