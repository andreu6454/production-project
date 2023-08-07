import {StateSchema} from "app/providers/StoreProvider";
import {getProfileIsLoading} from "entities/Profile";
import {getLoginError} from "features/AuthByUsername/model/selectors/getLoginError/getLoginError";

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