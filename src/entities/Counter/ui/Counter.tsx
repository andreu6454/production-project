import {Button} from "@/shared/ui/Button";
import {useCounterActions} from "../model/slice/counterSlice";
import {useCounterValue} from "../model/selectors/getCounterValue/getCounterValue";

export const Counter = () => {
    const counterValue = useCounterValue()
    const {decrement, increment} = useCounterActions()

    const handleInc = () => {
        increment()
    }
    const handleDec = () => {
        decrement()
    }

    return (
        <div>
            <h1 data-testid='value-title'> value: {counterValue}</h1>
            <Button data-testid='increment-button' onClick={handleInc}>increment</Button>
            <Button data-testid='decrement-button' onClick={handleDec}>Decrement</Button>
        </div>
    );
};
