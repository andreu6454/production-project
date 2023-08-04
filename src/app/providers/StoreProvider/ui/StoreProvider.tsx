import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import { ReactNode } from "react";
import {StateSchema} from "../config/StateSchema";
import { useNavigate } from "react-router-dom";

interface StoreProvidersProps {
    children: ReactNode;
    initialState?: StateSchema
}

export const StoreProvider = (props: StoreProvidersProps) => {
    const {
        children,
        initialState
    } = props

    const navigate = useNavigate()

    const store = createReduxStore(initialState,navigate)

    return (
        <Provider store={store}>
            <>
                {children}
            </>
        </Provider>
    );
};
