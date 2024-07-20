import { useState } from 'react'
import { Button } from '../../components/ui'
import Modal from '../../components/ui/Modal'
import IncomeOverview from '../../components/incomes/IncomeOverview'
import IncomeList from '../../components/incomes/IncomeList'
import { useFetchIncomes } from '../../hooks/useFetchIncomes'
import IncomeForm from '../../components/incomes/IncomeForm'
import { useTranslation } from 'react-i18next'

const Incomes = () => {
    const [showForm, setShowForm] = useState(false)
    const {fetchIncomesData} = useFetchIncomes()

    const { t } = useTranslation();

    const operationSuccess = () => {
        setShowForm(false)
        fetchIncomesData()
    }

    return (
        <>
            <div className="mb-6 p-4 flex flex-col gap-4">
                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{t("income.title")}</h1>
                    </div>
                    <div>
                        <Button onClick={() => setShowForm(true)}>{t("common.add_new")}</Button>
                    </div>
                </div>
                <IncomeOverview/>
                <Modal isOpen={showForm} onClose={() => setShowForm(false)} >
                    <Modal.Header>{t("income.add_income")}</Modal.Header>
                    <Modal.Body>
                        <IncomeForm operationSuccess={operationSuccess} />
                    </Modal.Body>
                </Modal>
                <IncomeList />
            </div>
        </>
    )
}

export default Incomes