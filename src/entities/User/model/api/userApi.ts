import {rtkApi} from "@/shared/api/rtkApi";
import {User} from "../types/userSchema";
import {JsonSettings} from "../types/jsonSettings";

interface SetJsonSettingsArg {
    userId: string,
    jsonSettings: JsonSettings
}

export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({userId, jsonSettings}) => ({
                url: '/users/' + userId,
                method: 'PATCH',
                body: {
                    jsonSettings
                }
            }),
        })
    })
})

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate