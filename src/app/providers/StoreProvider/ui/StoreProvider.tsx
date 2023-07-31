import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import { ReactNode } from "react";
import {StateSchema} from "../config/StateSchema";

interface StoreProvidersProps {
    children: ReactNode;
    initialState?: StateSchema
}

export const StoreProvider = (props: StoreProvidersProps) => {
    const {
        children,
        initialState
    } = props

    const store = createReduxStore(initialState)

    return (
        <Provider store={store}>
            <>
                {children}
            </>
        </Provider>
    );
};
