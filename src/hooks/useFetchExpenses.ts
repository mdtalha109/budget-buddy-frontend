import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Expense, FetchExpensesArgs, fetchExpenses } from '../redux/expenseSlice';
import { AppDispatch, RootState } from '../redux/store';
import dayjs from 'dayjs';

export const useFetchExpenses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const expenses: Expense[] = useSelector((state: RootState) => state.expense.expenses);
  const status = useSelector((state: RootState) => state.expense.status);
  const error = useSelector((state: RootState) => state.expense.error);

  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

  const fetchExpensesData = (args: FetchExpensesArgs = { startDate, endDate }) => {
    dispatch(fetchExpenses(args));
  };

  useEffect(() => {
    if (status === 'idle') {
      fetchExpensesData();
    }
  }, [status, dispatch]);

  return { expenses, status, error, fetchExpensesData };
};
