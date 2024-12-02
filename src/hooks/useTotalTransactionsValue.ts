import { useQuery } from "@tanstack/react-query";
import serverUrl from "../service/server";



export default function useTotalTransactionsValue(){
    const { data, isError, isLoading, error } = useQuery({ 
        queryKey: ['totals'], 
        queryFn: () => serverUrl.get('transactions/category/'),
    })
    return {isError, isLoading, error,
        categories: data?.data
     }
}