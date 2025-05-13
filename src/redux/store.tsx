import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './movieSlice.tsx'

export const store = configureStore({
    reducer: {
       image:imageReducer,
    },
})


console.log("Redux Store:", store.getState());
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch