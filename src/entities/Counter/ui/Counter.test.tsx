import {componentRender} from "@/shared/lib/tests/componentRender/componentRender";
import {screen} from "@testing-library/react";
import {Counter} from "@/entities/Counter";


describe('Counter tests', () => {
    test('Test render', () => {
        componentRender(<Counter/>, {
            initialState: {counter: {value: 10}}
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent("10");
    })
})