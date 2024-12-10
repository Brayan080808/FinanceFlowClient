import { BarChart2, DollarSign, ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react'
import Graph from '../Graph/Graph'
import TransactionsFilters from './TransactionsFilters'
import useCategories from '../../hooks/useCategories'
import Spiner from '../Spiner'
import Timeline from './Timeline'
import EmptyTransactions from '../dashboard/EmptyTransactions'
import GraphError from './GraphError'
import useUser from '../../store/useUser'
import PdfDownload from '../PdfDownload'
import { useRef } from 'react'

interface Data{
  category:string;
  amount:number;
  count:number;
  income:boolean;
}

// Definición de tipos para las transacciones y el nuevo objeto de transacción
export default function Stadicts(){
  const { theme } = useUser();
  const contentRef = useRef();

  const { spendingCategory, incomeTotal, isError, isLoading, refetch } = useCategories();

  



  if(isLoading) return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Spiner />
    </div>
    )

  const totalExpense = parseFloat(incomeTotal[0]?.amount ?? 0);
  const totalIncome = parseFloat(incomeTotal[1]?.amount ?? 0);
  const total = totalIncome + totalExpense*(-1);
  

  return (
    <div className=" w-screen flex-1 p-4 md:p-6  mx-auto " ref={contentRef} >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Estadísticas</h1>
              <PdfDownload contentRef={contentRef} />
          </div>

          <div className="flex  flex-wrap md:flex-nowrap gap-6 mb-6">

            <div className={` w-full p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Gastos</p>
                    <p className="text-2xl font-bold ">${totalExpense.toFixed(2)}</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-blue-500" />
                </div>
            </div>

            <div className={`w-full p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Ingresos</p>
                <p className="text-2xl font-bold ">${totalIncome.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            </div>

            <div className={` w-full p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  
                  
                  <p className={`text-2xl font-bold ${total > 0 ? "text-green-500" : "text-red-500" } `}>${Math.abs(total).toFixed(2)}
                    {
                      total > 0 ?
                          <TrendingUp className='text-green-500 inline ml-2'/>
                                :
                          <TrendingDown className='text-red-500 inline ml-2'/>

                    }
                  </p>
                  
                </div>
                <BarChart2 className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>
          
          { incomeTotal.length != 0 ? (
            <div>
                {isError ? <GraphError refetch={refetch} /> :
                  (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
                      <Graph  categories={spendingCategory.filter((item:Data) => item.income === true )} title={"Ingresos"}/>

                      <Graph categories={spendingCategory.filter((item:Data) => item.income === false )} title={"Gastos"} />
                  </div>
                  )
                }

              <div className='mb-6'>
                <Timeline  />
              </div>
              <TransactionsFilters />
            </div>
          ):
          (
            <div className='w-full h-full'>
                <EmptyTransactions />
            </div>
          )
        }
    </div>
  )
}
 