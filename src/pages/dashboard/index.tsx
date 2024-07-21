import React from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useQuery } from '@apollo/client';
import useAuth from '../../hooks/useAuth';
import { TOTAL_EXPENSE_QUERY } from '../../graphql/expense/query';
import { TOTAL_INCOMES_QUERY } from '../../graphql/incomes/query';
import ExpenseList from '../../components/expense/ExpenseList';
import IncomeList from '../../components/incomes/IncomeList';
import SummaryCard from '../../components/SummaryCard';
import MonthlyExpenseChart from './components/MonthlyExpenseChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import { Card } from '../../components/ui/Card';



const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');


  const { data: totalExpenses } = useQuery(TOTAL_EXPENSE_QUERY, {
    variables: { startDate, endDate },
  });

  const { data: totalIncomes } = useQuery(TOTAL_INCOMES_QUERY, {
    variables: { startDate, endDate },
  });


  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{t('dashboard.welcome', { name: user?.name })}</h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          {t('dashboard.overview')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <SummaryCard title={t('dashboard.total_expenses')} subTitle={t('dashboard.total_expenses_description')} data={totalExpenses?.totalExpenses?.data | 0} />
        <SummaryCard title={t('dashboard.total_income')} subTitle={t('dashboard.total_incomes_description')} data={totalIncomes?.totalIncomes | 0} />
        <SummaryCard title={t('dashboard.savings')} subTitle={t('dashboard.total_savings_description')} data={2} />
      </div>


      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
        <MonthlyExpenseChart />
        <IncomeVsExpenseChart />

        <Card>
          <h3 className="whitespace-nowrap text-lg sm:text-xl lg:text-2xl font-semibold leading-none tracking-tight mb-4">
            Last 5 Expense
          </h3>
          <ExpenseList limit={5} />
        </Card>

        <Card>
          <h3 className="whitespace-nowrap text-lg sm:text-xl lg:text-2xl font-semibold leading-none tracking-tight mb-4">
            Last 5 Income
          </h3>
          <IncomeList />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
