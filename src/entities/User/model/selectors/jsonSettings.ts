import {buildSelector} from "@/shared/lib/store";
import {JsonSettings} from "@/entities/User/model/types/jsonSettings";


const defaultJsonSettings: JsonSettings = {

}

export const [useJsonSettings, getJsonSettings] =
    buildSelector(
        state => state.user.authData?.jsonSettings ?? defaultJsonSettings
    );