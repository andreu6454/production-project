import {componentRender} from "@/shared/lib/tests/componentRender/componentRender";
import AppRouter from "./AppRouter";
import {getRouteAbout, getRouteAdmin, getRouteProfile} from "@/shared/const/router";
import {screen} from '@testing-library/react'
import {UserRole} from "@/entities/User/model/types/userSchema";

describe('AppRoute.test', () => {
    test('Страница должна отрендериться', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: getRouteAbout()
        })
        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })
    test('Страница не найдена', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: "/asdasdasd"
        })
        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })
    test('Редирект неавторизованного пользователя на главную', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: getRouteProfile('1')
        })
        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })
    test('Доступ к закрытой странице для авторизованного пользователя', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: getRouteProfile('1'),
            initialState: {
                user: {_inited: true, authData: {id: '1'}}
            }
        })
        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })
    test('Доступ запрещен (отсутствует роль)', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: getRouteAdmin(),
            initialState: {
                user: {_inited: true, authData: {id: '1'}}
            }
        })
        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })
    test('Доступ разрешен (отсутствует роль)', async () => {
        // @ts-ignore
        componentRender(<AppRouter/>, {
            route: getRouteAdmin(),
            initialState: {
                user: {_inited: true, authData: {id: '1', roles: [UserRole.ADMIN]}}
            }
        })
        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})