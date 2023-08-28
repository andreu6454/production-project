import {selectByTestId} from "../../helpers/selectByTestId";

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Переход открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Несуществующий маршрут', () => {
            cy.visit('/1231231wadsd')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })

    describe('Пользователь авторизован', () => {
        beforeEach(()=>{
            cy.login('test', 'test')
        })
        it('Переход открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })
        it('Переход открывает страницу со списком статей', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
        it('Переход открывает админ панель', () => {
            cy.visit('/admin')
            cy.get(selectByTestId('AdminPanelPage')).should('exist')
        })
    })

})