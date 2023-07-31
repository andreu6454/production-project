import {counterReducer, CounterSchema} from "enteties/Counter";
import {counterActions} from "enteties/Counter/model/slice/counterSlice";

describe('counterSlice.test', () => {
    test('decrement reducer test', () => {
        const counter: CounterSchema = {
            value: 10
        }
        expect(counterReducer(counter, counterActions.decrement)).toEqual({value: 9})
    })
    test('increment reducer test', () => {
        const counter: CounterSchema = {
            value: 10
        }
        expect(counterReducer(counter, counterActions.increment)).toEqual({value: 11})
    })
    test('should work with undefined', () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({value: 1})
    })
})