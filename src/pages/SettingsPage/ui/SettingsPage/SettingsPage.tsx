import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Text} from "@/shared/ui/redesigned/Text";
import {Page} from "@/widgets/Page/Page";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {UiDesignSwitcher} from "@/features/uiDesignSwitcher";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const {className} = props;
    const {t} = useTranslation();

    return (
        <Page>
            <VStack max gap={'16'} align={'start'}>
                <Text title={t('Настройки пользователя')}/>
                <UiDesignSwitcher/>
            </VStack>
        </Page>
    );
});

export default SettingsPage;