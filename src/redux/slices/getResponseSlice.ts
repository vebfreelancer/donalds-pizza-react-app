import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type FetchItem = {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    rating: number;
    category: number;
    sizes: number[];
    types: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: FetchItem[];
    status: Status;
}

export const fetchData = createAsyncThunk<FetchItem[]>( 'response/fetchDataStatus', async () => {
        const { data } = await axios.get<FetchItem[]>('http://localhost:3000/db.json');
        return data;
    }
)

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const getResponseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchItem[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
        })

        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchData.rejected, (state) => {
            state.items = [];
            state.status = Status.ERROR;
        })
    }
});

export const { setItems } = getResponseSlice.actions;
export default getResponseSlice.reducer;