import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {scrollRestorationSchema} from "@/widgets/Page/ScrollRestoration";

const initialState: scrollRestorationSchema = {
    scroll: {}
}

export const scrollRestorationSlice = createSlice({
    name: 'storeRestorationSlice',
    initialState,
    reducers: {
        setScrollPosition(state, {payload}: PayloadAction<{ path: string, position: number }>) {
            state.scroll[payload.path] = payload.position
        }
    },
    extraReducers: (builder) => {
    }
})

export const {actions: scrollRestorationActions} = scrollRestorationSlice

export const {reducer: scrollRestorationReducer} = scrollRestorationSlice