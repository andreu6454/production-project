import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {fetchProfileData} from "entities/Profile";
import {Country} from "entities/Country/model/types/Country";
import {Currency} from "entities/Currency/model/types/types";

const testData = {
    username: 'admin',
    age: 21,
    country: Country.Russia,
    lastname: 'malin',
    first: 'andrey',
    city: 'spb',
    currency: Currency.RUB
}

describe('fetchProfileData.test', () => {
    test('success', async () => {

        const thunk = new TestAsyncThunk(fetchProfileData)

        thunk.api.get.mockReturnValue(Promise.resolve({data: testData}))

        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(testData)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)

        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('1')

        expect(result.meta.requestStatus).toBe('rejected')

    })
})