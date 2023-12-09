import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Sort = {
    type: 'rating' | 'price' | 'alphabetically';
    displayBy: 'ascending' | 'descending';
}

interface FilterSliceState {
    category: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    category: 0,
    sort: {
        type: 'rating',
        displayBy: 'descending'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        changeSortType: (state, action: PayloadAction<'rating' | 'price' | 'alphabetically'>) => {
            state.sort.type = action.payload;
        },
        changeSortDisplay: (state, action: PayloadAction<'ascending' | 'descending'>) => {
            state.sort.displayBy = action.payload;
        },
        setFilters: (state, action: PayloadAction<{
            category: number; 
            type: 'rating' | 'price' | 'alphabetically'; 
            displayBy: 'ascending' |'descending';
        }>) => {
            state.category = Number(action.payload.category);
            state.sort.type = action.payload.type;
            state.sort.displayBy = action.payload.displayBy;
        }
    },
})

export const { changeCategory, changeSortType, changeSortDisplay, setFilters } = filterSlice.actions;
export default filterSlice.reducer;