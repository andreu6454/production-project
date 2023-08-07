import {StateSchema} from "app/providers/StoreProvider";
import {getLoginError} from "features/AuthByUsername/model/selectors/getLoginError/getLoginError";
import {Country} from "entities/Country/model/types/Country";
import {Currency} from "entities/Currency/model/types/types";
import {getProfileData} from "entities/Profile";

describe('getProfileData.test', () => {
    test('should return profile data', () => {

        const testData = {
            username: 'admin',
            age: 21,
            country: Country.Russia,
            lastname: 'malin',
            first: 'andrey',
            city: 'spb',
            currency: Currency.RUB
        }

        const state: DeepPartial<StateSchema> = {
            profile: {
                data: testData
            }
        }

        expect(getProfileData(state as StateSchema)).toEqual(testData)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})