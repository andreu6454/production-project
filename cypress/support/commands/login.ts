import {USER_LOCALSTORAGE_KEY} from "../../../src/shared/const/localStorage";

export const cypressLogin = (username: string = 'test', password: string = 'test') => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password
        }
    }).then(({body}) => {
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
    })
}