import {classNames} from "shared/lib/classNames/classNames";
import {useDispatch, useSelector} from "react-redux";
import {counterActions} from "entities/counter/model/slice/CounterSlice";
import {StateSchema} from "app/providers/storeProvider/config/StateSchema";



export interface CounterProps {
    className?: string;
}



// component -> dispatcher -> reducer -> state
// we need store provider to be able connect with our components
export const Counter = ({}:CounterProps) => {
    const dispatch = useDispatch(); // send actions
    const counter_value = useSelector((state: StateSchema) => state.counter.value) // get actions
    const increment = () => {
        dispatch(counterActions.increment())
    }
    const decrement = () => {
        dispatch(counterActions.decrement())
    }
    return (
        <div>
            <h1>value = {counter_value}</h1>
            <button  onClick={increment}>
                increment
            </button>
            <button onClick={decrement}>
                decrement
            </button>
        </div>
    );
};
