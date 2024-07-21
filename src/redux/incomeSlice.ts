import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import client from '../apolloClient';
import { GET_INCOMES } from '../graphql/incomes/query';

export interface Expense {
    id: string;
    userId: number;
    description: string;
    amount: number;
    date: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpenseState {
    incomes: Expense[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ExpenseState = {
    incomes: [],
    status: 'idle',
    error: null,
};

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
}


export interface FetchExpensesArgs {
    startDate?: string;
    endDate?: string;
}



export const fetchIncomes = createAsyncThunk<Expense[], FetchExpensesArgs, { rejectValue: string }>(
    'expenses/fetchIncomes',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const response = await client.query({ query: GET_INCOMES, variables: { startDate, endDate }, fetchPolicy: 'network-only' });
            const { success, data, message } = response.data.getIncomes;
            if (!success) {
                return rejectWithValue(message);
            }
            return data;
        } catch (error: any) {
            console.log("error: ", error)
            return rejectWithValue(error.message);
        }
    }
);

const IncomesSlice = createSlice({
    name: 'incomes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIncomes.fulfilled, (state, action: PayloadAction<Expense[]>) => {
                console.log("succeed")
                state.status = 'succeeded';
                state.incomes = action.payload;
            })
            .addCase(fetchIncomes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch expenses';
            });
    },
});

export default IncomesSlice.reducer;