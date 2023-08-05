import {componentRender} from "shared/lib/tests/componentRender/componentRender";
import {screen} from "@testing-library/react";
import {Counter} from "entities/Counter";
import {userEvent} from "@storybook/testing-library";


describe('Counter tests', () => {
    test('Test render', () => {
        componentRender(<Counter/>, {
            initialState: {counter: {value: 10}}
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent("10");
    })
    test('increment', () => {
        componentRender(<Counter/>, {
            initialState: {counter: {value: 10}}
        });
        userEvent.click(screen.getByTestId('increment-button'))
        expect(screen.getByTestId('value-title')).toHaveTextContent("11");
    })
    test('decrement', () => {
        componentRender(<Counter/>, {
            initialState: {counter: {value: 10}}
        });
        userEvent.click(screen.getByTestId('decrement-button'))
        expect(screen.getByTestId('value-title')).toHaveTextContent("9");
    })
})