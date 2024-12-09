import Spiner from '../Spiner';
import useTransactions from '../../hooks/useTransaction';
import Transaction from './Transaction';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: String;
  category: string;
  income: boolean;
  procesado?: boolean;
}

export default function TransactionsBox({resetNew,isError,isPending:isPendingNew,mutate}){
  const { transactions, isPending, fetchNextPage, hasNextPage, isFetchingNextPage,isFetchNextPageError } = useTransactions();

  




  if (isPending) return <Spiner />


  return(
    <div className="space-y-4">

    { transactions?.map((item:Transaction,key:number) => 
    (
      <Transaction transaction={item} key={key} isPendingNew={key==0 ? isPendingNew : null}  isErrorNew={key==0 ? isError : null} mutatePost={key==0 ? mutate : function(){}} 
      resetNew={key==0 ? resetNew : function(){}} />

    ))}

    {
      isFetchingNextPage && (
        <div className="flex justify-center items-center py-20">
          <Spiner/>
        </div>
      )
    }

    {
      isFetchNextPageError && (
        <div className="flex justify-center items-center py-20">
          <h3 className="text-red-600">Ocurrio un error</h3>
        </div>
      )
    }

    {
       hasNextPage && !isFetchingNextPage  && <button onClick={() => fetchNextPage()}>Cargar mas...</button>
    }
  </div>
  )

}