import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { GET_EXPENSES } from '../graphql/expense/query';
import client from '../apolloClient';

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
    expenses: Expense[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ExpenseState = {
    expenses: [],
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



export const fetchExpenses = createAsyncThunk<Expense[], FetchExpensesArgs, { rejectValue: string }>(
    'expenses/fetchExpenses',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const response = await client.query({ query: GET_EXPENSES, variables: { startDate, endDate }, fetchPolicy: 'network-only' });
            const { success, data, message } = response.data.getExpenses;
            if (!success) {
                return rejectWithValue(message);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
                console.log("succeed")
                state.status = 'succeeded';
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                console.log("failed")
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch expenses';
            });
    },
});

export default expensesSlice.reducer;