import {ToggleFeatures} from "@/shared/lib/features";
import {ProfileCardDeprecated} from "./ProfileCardDeprecated/ProfileCardDeprecated";
import {ProfileCardRedesigned} from "./ProfileCardRedesigned/ProfileCardRedesigned";
import {Profile} from "../../model/types/profile";
import {Country} from "@/entities/Country/model/types/Country";
import {Currency} from "@/entities/Currency/model/types/types";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string | undefined;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCountry?: (value: Country) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <ProfileCardRedesigned
                    {...props}
                />
            }
            off={
                <ProfileCardDeprecated
                    {...props}
                />
            }
        />
    );
};
