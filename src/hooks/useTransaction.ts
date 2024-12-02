import { useInfiniteQuery } from "@tanstack/react-query";
import serverUrl from "../service/server";
import  useFilters  from "../store/useFilters"


export default function useTransactions(){  
    const { getUrl } = useFilters(); 
    const url  = getUrl();

    const { data, isError, isPending, error, hasNextPage, fetchNextPage, isFetchNextPageError, isFetchingNextPage, isSuccess } = useInfiniteQuery({ 
        queryKey: ['transactions',url], 
        initialPageParam: 0,
        queryFn: (pageParam) => 
            serverUrl.get(url,{params:{
                'page':pageParam.pageParam
            }})
            .then((response)=> response.data),


        getNextPageParam: (lastPage) => {
            return lastPage.next;
        },
    })
    return {
        isPending, 
        isError,
        isSuccess,
        error, 
        hasNextPage,
        isFetchingNextPage,
        isFetchNextPageError,
        fetchNextPage,
        data: data?.pages[0],
        transactions: data?.pages.flatMap(page => page.transactions) ?? []
    
    }
}