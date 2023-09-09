describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.login().then(data => {
            cy.visit('profile/' + data.id);
        })
    })
    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'User')
    })
    it('И редактирует его', () => {

    })
})