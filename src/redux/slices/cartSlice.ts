import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type OrderItem = {
    id: number;
    imageUrl: string;
    price: number;
    title: string;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: OrderItem[];
}

const { items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<OrderItem>) => {
            const findItem = state.items.find(obj => 
                obj.id === action.payload.id && 
                obj.type === action.payload.type && 
                obj.size === action.payload.size
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        plusItem: (state, action: PayloadAction<number>) => {
            state.items[action.payload].count++;
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<number>) => {
            state.items[action.payload].count--;
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;