import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Expense, FetchExpensesArgs, fetchIncomes } from '../redux/incomeSlice';
import { AppDispatch, RootState } from '../redux/store';
import dayjs from 'dayjs';

export const useFetchIncomes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const incomes: Expense[] = useSelector((state: RootState) => state.income.incomes);

  const status = useSelector((state: RootState) => state.income.status);
  const error = useSelector((state: RootState) => state.income.error);

  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

  const fetchIncomesData = (args: FetchExpensesArgs = { startDate, endDate }) => {
    dispatch(fetchIncomes(args));
  };

  useEffect(() => {
    if (status === 'idle') {
      fetchIncomesData();
    }
  }, [status, dispatch]);
  
  return { incomes, status, error, fetchIncomesData };
};
