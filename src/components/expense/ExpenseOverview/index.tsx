
import { useTranslation } from 'react-i18next';
import { useFetchExpenses } from '../../../hooks/useFetchExpenses';
import SummaryCard from '../../SummaryCard';

const ExpenseOverview = () => {
  
  const { expenses } = useFetchExpenses();
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      <SummaryCard title={t('dashboard.no_of_expense')} subTitle={t('dashboard.no_of_time_expense')} data={expenses.length} />
      <SummaryCard title={t('dashboard.total_expenses')} subTitle={t('dashboard.total_expenses_description')} data={totalExpense} />
    </div>
  )
}

export default ExpenseOverview