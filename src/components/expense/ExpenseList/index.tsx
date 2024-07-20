import React from 'react';
import { useFetchExpenses } from '../../../hooks/useFetchExpenses';
import {  Column} from 'react-table';
import dayjs from 'dayjs';
import DataTable from '../../ui/DataTable';

interface Expense {
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpenseListProps{
  limit?: number
}

const ExpenseList: React.FC<ExpenseListProps> = ({limit}) => {
  const { expenses, status, error } = useFetchExpenses();

  const columns = React.useMemo<Column<Expense>[]>(
    () => [
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => dayjs(value).format('MMMM D, YYYY'),
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
    ],
    []
  );

  let newExpenses = React.useMemo(() => limit ? expenses.slice(0, limit) : expenses, [expenses, limit]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <div>
          <DataTable columns={columns} data={newExpenses} pageSize={10}/>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
