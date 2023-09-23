import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginError} from "@/features/authByUsername/model/selectors/getLoginError/getLoginError";
import {getProfileIsLoading} from "./getProfileIsLoading";

describe('getProfileIsLoading.test', () => {
    test('should return isLoading', () => {

        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true
            }
        }

        expect(getProfileIsLoading(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})