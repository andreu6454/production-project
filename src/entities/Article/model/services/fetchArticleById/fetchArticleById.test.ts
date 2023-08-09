import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {fetchArticleById} from "entities/Article/model/services/fetchArticleById/fetchArticleById";

const testData = {
    id: "1",
    title: "title",
    subtitle: "sub",
    img: "src",
    views: 22,
    createdAt: "1.1.2023",
    type: [],
    blocks: [],
}
describe('fetchArticleById.test', () => {
    test('success', async () => {

        const thunk = new TestAsyncThunk(fetchArticleById)

        thunk.api.get.mockReturnValue(Promise.resolve({data: testData}))

        const result = await thunk.callThunk("1")

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(testData)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById)

        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk("1")

        expect(result.meta.requestStatus).toBe('rejected')

    })
})