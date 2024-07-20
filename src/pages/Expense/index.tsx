
import { useState } from 'react'
import ExpenseForm from '../../components/expense/ExpenseForm'
import { Button } from '../../components/ui'
import Modal from '../../components/ui/Modal'
import ExpenseList from '../../components/expense/ExpenseList'
import { useFetchExpenses } from '../../hooks/useFetchExpenses'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import { useTranslation } from 'react-i18next'

const Expense = () => {
    const [showForm, setShowForm] = useState(false)
    const { fetchExpensesData } = useFetchExpenses();

    const { t } = useTranslation();
   
    const operationSuccess = () => {
        setShowForm(false)
        fetchExpensesData()
    }
    return (
        <>
            <div className="mb-6 p-4 flex flex-col gap-4">
                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{t("expense.title")}</h1>
                    </div>
                    <div>
                        <Button onClick={() => setShowForm(true)}>{t("common.add_new")}</Button>
                    </div>
                </div>
                <ExpenseOverview />
                <Modal isOpen={showForm} onClose={() => setShowForm(false)} >
                    <Modal.Header>{t("expense.add_expense")}</Modal.Header>
                    <Modal.Body>
                        <ExpenseForm operationSuccess={operationSuccess} />
                    </Modal.Body>
                </Modal>


                <ExpenseList />

            </div>
        </>
    )
}

export default Expense