import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginPassword} from "@/features/authByUsername/model/selectors/getLoginPassword/getLoginPassword";

describe('getLoginPassword.test', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: "123"
            }
        }
        expect(getLoginPassword(state as StateSchema)).toEqual("123")
    })
    test('should return empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginPassword(state as StateSchema)).toEqual("")
    })
})