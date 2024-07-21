import React from 'react';
import dayjs from 'dayjs';
import { LineChart, CartesianGrid, Line, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../../components/ui/chart';
import { Card } from '../../../components/ui/Card';

import { aggregateByDay } from '../../../utils/aggregate';
import { useFetchExpenses } from '../../../hooks/useFetchExpenses';

const MonthlyExpenseChart = () => {
  const {expenses} = useFetchExpenses()
  const currentDate = dayjs();
  const daysInMonth = currentDate.daysInMonth();

  const expensesByDay = aggregateByDay(expenses, daysInMonth);

  const data = expensesByDay.map((amount, index) => ({
    day: (index + 1).toString(),
    amount,
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
        Monthly Expense
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={4} />
          </LineChart>
        </ChartContainer>
      </h3>
    </Card>
  )
};

export default MonthlyExpenseChart;
