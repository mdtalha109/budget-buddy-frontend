import React from 'react';
import {  Column} from 'react-table';
import { useFetchIncomes } from '../../../hooks/useFetchIncomes';
import dayjs from 'dayjs';
import DataTable from '../../ui/DataTable';

interface Expense {
  description: string;
  amount: number;
  date: string;
  category: string;
}

const IncomeList: React.FC = () => {
  const { incomes, status, error } = useFetchIncomes();

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
        Cell: ({ value }) => dayjs(value).format('MMMM D, YYYY h:mm A'),
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
    ],
    []
  );

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <div>
          <DataTable columns={columns} data={incomes} pageSize={10} />
        </div>
      )}
    </div>
  );
};

export default IncomeList;
