import {TestAsyncThunk} from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import {initArticlesPage} from "./initArticlesPage";
import {ArticleView} from "entities/Article";
import {fetchArticlesList} from "../../services/fetchArticlesList/fetchArticlesList";

jest.mock('../fetchArticlesList/fetchArticlesList')

const articlesPage = {
    page: 1,
    ids: [],
    entities: {},
    limit: 5,
    isLoading: false,
    hasMore: true,
    _inited: false,
    view: ArticleView.BIG
}

describe('initArticlesPage.test', () => {
    // test('success', async () => {
    //
    //
    //     const thunk = new TestAsyncThunk(initArticlesPage, {
    //         articlesPage
    //     })
    //
    //     await thunk.callThunk({} as URLSearchParams)
    //
    //     expect(thunk.dispatch).toBeCalledTimes(2)
    //     expect(fetchArticlesList).toHaveBeenCalled()
    // })
    test('success', async () => {

        const newArticlesPage = {...articlesPage, _inited: true}

        const thunk = new TestAsyncThunk(initArticlesPage, {
                articlesPage: newArticlesPage
            }
        )

        await thunk.callThunk({} as URLSearchParams)

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})