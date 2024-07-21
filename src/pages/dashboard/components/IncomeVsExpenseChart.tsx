import React from 'react';
import { BarChart, CartesianGrid, Bar, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../../../components/ui/chart';
import { Card } from '../../../components/ui/Card';
import { aggregateByMonth } from '../../../utils/aggregate';
import dayjs from 'dayjs';
import { useFetchExpenses } from '../../../hooks/useFetchExpenses';
import { useFetchIncomes } from '../../../hooks/useFetchIncomes';

const IncomeVsExpenseChart = () => {

  const {expenses} = useFetchExpenses()
  const {incomes} = useFetchIncomes()

  const incomeByMonth = aggregateByMonth(incomes);
  const expensesByMonth = aggregateByMonth(expenses);


  const chartData = incomeByMonth.map((income, index) => ({
    month: dayjs().month(index).format('MMMM'),
    income,
    expense: expensesByMonth[index],
  }));

  const chartConfig = {
    income: {
      label: "Income",
      color: "#2563eb",
    },
    expense: {
      label: "Expense",
      color: "#60a5fa",
    },
  } satisfies ChartConfig
  
  return (
  <Card>
    <h3 className="whitespace-nowrap text-lg sm:text-xl lg:text-2xl font-semibold leading-none tracking-tight mb-4">
      Income vs Expense
    </h3>
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={5} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={0} />
      </BarChart>
    </ChartContainer>
  </Card>
  )
};

export default IncomeVsExpenseChart;
