
import { useTranslation } from 'react-i18next';
import { useFetchIncomes } from '../../../hooks/useFetchIncomes';
import SummaryCard from '../../SummaryCard';

const IncomeOverview = () => {
  const { incomes } = useFetchIncomes();
  const { t } = useTranslation();

  const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      <SummaryCard title={t('dashboard.no_of_income')} subTitle={t('dashboard.no_of_time_income')} data={incomes.length} />
      <SummaryCard title={t('dashboard.total_income')} subTitle={t('dashboard.total_incomes_description')} data={totalIncomes} />

    </div>
  )
}

export default IncomeOverview