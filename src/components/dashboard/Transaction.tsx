import { Clock3, ShoppingBag, Trash2, RotateCcw,X } from 'lucide-react'
import useMutationDeleteTransactions from '../../hooks/useMutationDeleteTransactions';
import { useQueryClient } from "@tanstack/react-query";
import useFilters from '../../store/useFilters';
import useUser from '../../store/useUser';

interface Transaction {
    name: string;
    amount: number;
    category: string;
}

interface Page{
    count:number;
    transactions:Transaction[];
    category:string
}


interface PagesTransaction{
    pageParams:number[];
    pages:Page[];
}



export default function Transaction({transaction,isErrorNew,isPendingNew, mutatePost, resetNew}){
    const { mutate, isPending, isError, reset } = useMutationDeleteTransactions();
    const queryClient = useQueryClient();
    const { getUrl } = useFilters();
    const url = getUrl();
    const { theme } = useUser();




    
    const handleCancel = () => {
        const transactions:PagesTransaction = queryClient.getQueryData(['transactions',url]);
        if(isErrorNew){
            transactions?.pages[0].transactions.shift();
            queryClient.setQueryData(['transactions',url],transactions);
            resetNew();
        }
        else{
            reset()

        }

    } 

    const handleDelete = () => {
        mutate(transaction.id)
    }

    const handleRetry = () => {
        if(isError){
            mutate(transaction.id)
        }
        else{
            mutatePost(transaction)
        }       
    }

    return(
        <div className="space-y-2">
            <div className={`
                flex items-center justify-between border-b pb-2 p-4 
                ${(isError || isErrorNew) && " bg-red-50 border-red-200 "}
                ${(isPending || isPendingNew) && (theme === "dark" ? "  bg-black/30 border-black " : "bg-gray-50 border-gray-200") }
            `}>
                <div className="flex items-center space-x-2">
                    <ShoppingBag className={`h-6 w-6 ${(isError || isErrorNew) ? 'text-red-500' : 'text-gray-500'}`} />
                    <div>
                        <span className={`block ${(isError || isErrorNew) && 'text-red-600'}`}>{transaction.name}</span>
                        <span className={`text-sm ${(isError || isErrorNew) ? 'text-red-400' : 'text-gray-500'}`}>
                            {transaction.date == null ? <Clock3 className='w-[1.1rem] h-[1.1rem] inline' /> : transaction.date} - {transaction.category}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={transaction.income === true ? 'text-green-500' : 'text-red-500'}>
                        {transaction.income === true ? '+' : '-'}${Math.abs(transaction.amount)}
                    </span>
                    <button 
                        className={`${(isError || isErrorNew) ? 'text-red-400 hover:text-red-600' : 'text-red-500 hover:text-red-700'}`}
                        disabled={isError || isPending || isErrorNew}
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {(isError || isErrorNew ) && (
                <div className='flex justify-center'>
                    <button 
                    className="  w-[10rem] flex-1 py-2 px-4 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 flex items-center justify-center"
                    onClick={handleRetry}
                >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reintentar
                </button>
                <button 
                    className="  w-[10rem] flex-1 py-2 px-4 bg-gray-50 text-gray-600 border border-gray-200 rounded hover:bg-gray-100 flex items-center justify-center"
                    onClick={handleCancel}
                >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                </button>
                </div>
            )}
        </div>
    )
}

