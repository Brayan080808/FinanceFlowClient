import { useState } from "react";
import { Plus,Search } from 'lucide-react'
import useFilters from "../../store/useFilters";
import { useForm, SubmitHandler } from 'react-hook-form';
import TransactionsBox from './TransactionsBox'
import AddTransactionBox from './AddTransactionBox'
import useTransactions from "../../hooks/useTransaction";
import Spiner from "../Spiner";
import ErrorTransaction from "./TransaccionError";
import useMutationPostTransactions from "../../hooks/useMutationPostTransactions";
import useUser from "../../store/useUser";


interface SearchForm {
  search:string
}

export default function TransactionsFilters(){
    const [showForm, setShowForm] = useState<boolean>(false);
    const { setSearch, setType, setOrder } = useFilters();
    const { register, handleSubmit } = useForm<SearchForm>();
    const { theme } = useUser(); 

    const { isPending, isError, isSuccess } = useTransactions();

    const { mutate, isError:isErrorNew, isPending:isPendingNew, reset:resetNew } = useMutationPostTransactions();

    const onSearch:SubmitHandler<SearchForm> = (data:SearchForm) => {
      setSearch(data.search);
    }

    const handleOrder = (value:string) => {
      setOrder(value);
    }

    const handleType = (value:string) => {
      setType(value)
    } 

    return(
        <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-6`}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Últimas Transacciones</h2>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Añadir Transacción
          </button>
        </div>

        {showForm && (
            <AddTransactionBox  mutate={mutate} />
        )}

        <div className="flex items-center mb-4">
          <div className="flex flex-wrap gap-4 sm:gap-2 justify-center">
            <select
              onChange={(e) => handleType(e.target.value as 'expense' | 'income' | 'all')}
              className={`flex-1 p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="all">Todas</option>
              <option value="expense">Gastos</option>
              <option value="income">Ingresos</option>
            </select>

            <select
              className={`flex-1 p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
              onChange={(e) => handleOrder(e.target.value as 'date' | 'amount')}
            >
              <option value="date">Fecha</option>
              <option value="amount">Monto</option>
            </select>

            <form onSubmit={handleSubmit(onSearch)} className="flex overflow-hidden w-full sm:w-auto">
              <input
                type="search"
                placeholder="Buscar transacción..."
                id="search" 
                {...register('search')}
                className={` flex w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <div className="m-auto p-1">
                <button className=" hover:opacity-40" type="submit">
                  <Search />
                </button>
              </div>
            </form>
          </div>


        </div>
        {isPending && ( 
            <div className=" h-[30vh] flex justify-center items-center ">
              <Spiner /> 
            </div> 
          )
        }

        {isError && <ErrorTransaction />}
        {isSuccess && <TransactionsBox resetNew={resetNew} isError={isErrorNew} isPending={isPendingNew} mutate={mutate} />}
        
      </div>
    )
}