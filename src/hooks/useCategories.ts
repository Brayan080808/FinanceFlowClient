import { useQuery } from "@tanstack/react-query";
import serverUrl from "../service/server";



export default function useCategories(){
    const { data, isError, isLoading, error, isSuccess ,refetch } = useQuery({ 
        queryKey: ['categories'], 
        queryFn: () => serverUrl.get('transactions/category/'),
        retry:1,
    })

    return {isError, isLoading, error,data,isSuccess,refetch,

        spendingCategory: data?.data.spendingCategory.length === 0 ? [{"amount":"0","count":"0"}] :data?.data.spendingCategory,
        incomeTotal: data?.data.incomeTotal ?? [{"amount":0},{"amount":0}],
        // incomeCategory: data?.data.incomeCategory,
     }
}