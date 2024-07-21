import dayjs from "dayjs";

const aggregateByDay = (data: any, daysInMonth: number) => {
    const dataByDay = new Array(daysInMonth).fill(0);

    data.forEach(_ => {
        const day = dayjs(_.date).date();
        dataByDay[day - 1] += _.amount;
    });

    return dataByDay;
};

const aggregateByMonth = (transactions: any) => {
    const months = new Array(12).fill(0);

    transactions.forEach((transaction: { date: string | number | dayjs.Dayjs | Date | null | undefined; amount: any; }) => {
        const month = dayjs(transaction.date).month(); 
        months[month] += transaction.amount;
    });

    return months;
};

export {aggregateByDay, aggregateByMonth}