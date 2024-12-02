import  { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import AddTransactionBox from './AddTransactionBox'
import useMutationPostTransactions from '../../hooks/useMutationPostTransactions'
import useUser from '../../store/useUser';

export default function EmptyTransactions() {

  const { mutate } = useMutationPostTransactions();
  const { theme } = useUser();


  const [showForm, setShowForm] = useState(false)
  const handleAddTransaction = () => {
    setShowForm(true)
  }

  return (
    <div className={`flex flex-col ${ !showForm  ? "items-center justify-center  p-8 ": "p-20" }  rounded-lg  ${theme === "dark" ? "bg-gray-800" : "bg-white" }  shadow-sm`}>
      {!showForm ? (
        <>
          <div className="w-20 h-20 mb-6">
            <svg
              className="w-full h-full text-blue-500 dark:text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <h2 className={`text-xl font-semibold  ${theme === "dark" ? "text-white" : "text-gray-900" } mb-2`}>
            No hay transacciones aún
          </h2>
          
          <p className={` ${theme === "dark" ? "text-gray-400" : "text-gray-500 " } text-center mb-8 max-w-sm`}>
            Comienza a registrar tus movimientos financieros para tener un mejor control de tus gastos e ingresos
          </p>
          
          <button
            onClick={handleAddTransaction}
            className={` inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 font-medium focus:outline-none focus:ring-2   ${ theme === "dark" ? "focus:ring-offset-gray-800 ": " focus:ring-blue-500 focus:ring-offset-2 " }`}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Añadir Transacción
          </button>
        </>
      ) : 
         <AddTransactionBox  mutate={mutate} />
      }
    </div>
  )
}