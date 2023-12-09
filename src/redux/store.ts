import { configureStore } from '@reduxjs/toolkit';
import search from './slices/searchSlice';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import response from './slices/getResponseSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        search,
        filter,
        cart,
        response
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;