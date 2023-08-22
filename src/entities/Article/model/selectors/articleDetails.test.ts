import {StateSchema} from "@/app/providers/StoreProvider";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "@/entities/Article/model/selectors/articleDetails";

describe('articleDetails.test', () => {
    test('should return article data', () => {

        const testData = {
            id: '1',
            title: 'subtitle'
        }

        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: testData
            }
        }

        expect(getArticleDetailsData(state as StateSchema)).toEqual(testData)
    })

    test('should return isLoading true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true
            }
        }

        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
    })

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error'
            }
        }

        expect(getArticleDetailsError(state as StateSchema)).toEqual('error')
    })

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}

        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined)
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined)
    })
})