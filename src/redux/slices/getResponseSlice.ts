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
        // https://my.api.mockaroo.com/pizzas.json?key=a152ed40
        const { data } = await axios.get<FetchItem[]>('https://my.api.mockaroo.com/pizzas.json?key=a152ed40');
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