import { useQuery } from "@tanstack/react-query";
import serverUrl from "../service/server";


export default function useCoin(){
    const { data, isError, isLoading, error, isSuccess, refetch } = useQuery({ 
        queryKey: ['coin'], 
        queryFn: () => serverUrl.get('users/coin'),
        retry:1,
    })

    return {isError, isLoading, error ,data, isSuccess, refetch,

        coin: data?.data.coin
     }
}