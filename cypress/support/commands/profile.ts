// import {USER_LOCALSTORAGE_KEY} from "../../../src/shared/const/localStorage";
// import {User} from "../../../src/entities/User";
//
// export const updateProfile = (username: string = 'test', password: string = 'test') => {
//     cy.getByTestId('')
// }
//
// export const resetProfile = (testId: string) => {
//     cy.request({
//         method: 'POST',
//         url: 'http://localhost:8000/login',
//         body: {
//             username,
//             password
//         }
//     }).then(({body}) => {
//         window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
//         return body
//     })
// }
//
// declare global {
//     namespace Cypress {
//         interface Chainable {
//             login(email?: string, password?: string): Chainable<User>,
//
//             getByTestId(testId: string): Chainable<ReturnType<typeof cy.get>>
//         }
//     }
// }