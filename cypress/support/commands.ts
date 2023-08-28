import {cypressLogin} from "./commands/login";

Cypress.Commands.add('login', cypressLogin);

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<void>
        }
    }
}

export {};