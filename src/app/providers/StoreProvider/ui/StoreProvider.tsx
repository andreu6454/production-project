import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import {ReactNode} from "react";
import {StateSchema} from "../config/StateSchema";
import {useNavigate} from "react-router-dom";

interface StoreProvidersProps {
    children: ReactNode;
    initialState?: StateSchema,
    // asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProvidersProps) => {
    const {
        children,
        initialState,
        // asyncReducers
    } = props

    const navigate = useNavigate()

    const store =
        createReduxStore(
            initialState,
            // asyncReducers as ReducersMapObject<StateSchema>,
            navigate)

    return (
        <Provider store={store}>
            <>
                {children}
            </>
        </Provider>
    );
};
