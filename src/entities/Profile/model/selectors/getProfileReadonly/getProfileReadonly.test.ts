import {StateSchema} from "app/providers/StoreProvider";
import {getProfileReadonly} from "entities/Profile";
import {getLoginError} from "features/AuthByUsername/model/selectors/getLoginError/getLoginError";

describe('getProfileReadonly.test', ()=> {
    test('should return profile readonly', () => {

        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true
            }
        }

        expect(getProfileReadonly(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})