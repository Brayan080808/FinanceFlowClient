import { useQuery } from "@tanstack/react-query";
import serverUrl from "../service/server";

export default function useTimeline({timeRange,dateRange}){
    const { data, isError, isLoading, error, isSuccess, refetch } = useQuery({ 
        queryKey: ['timeline',timeRange,dateRange.end,dateRange.start], 
        queryFn: () => serverUrl.get(`transactions/timeline?time=${timeRange}&start=${dateRange.start?.toLocaleDateString()}&end=${dateRange.end?.toLocaleDateString()}`),
    })
    return { isError, isLoading, refetch, isSuccess, error, 
             data: data?.data.map(
                (item) => 
                    ({...item, value:parseFloat(item.value)}))
            }
}