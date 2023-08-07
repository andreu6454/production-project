import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {updateProfileData} from "entities/Profile";
import {Country} from "entities/Country/model/types/Country";
import {Currency} from "entities/Currency/model/types/types";
import {ValidateProfileError} from "entities/Profile/model/types/profile";

const testData = {
    username: 'admin',
    age: 21,
    country: Country.Russia,
    lastname: 'malin',
    first: 'andrey',
    city: 'spb',
    currency: Currency.RUB
}

describe('updateProfileData.test', () => {
    test('success', async () => {

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testData
            }
        })

        thunk.api.put.mockReturnValue(Promise.resolve({data: testData}))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(testData)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testData
            }
        })

        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
    })

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {...testData, lastname: ''}
            }
        })

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })
})