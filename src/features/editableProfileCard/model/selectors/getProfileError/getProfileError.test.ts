import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginError} from "@/features/authByUsername/model/selectors/getLoginError/getLoginError";
import {getProfileError} from "./getProfileError";

describe('getProfileError.test', () => {
    test('should return error', () => {

        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error'
            }
        }

        expect(getProfileError(state as StateSchema)).toEqual('error')
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})