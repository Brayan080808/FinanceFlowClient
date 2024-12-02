import { useMutation, useQueryClient } from "@tanstack/react-query";
import serverUrl from "../service/server";
import useFilters from "../store/useFilters";

export default function useMutationDeleteTransactions(){
    const queryClient = useQueryClient();
    const { getUrl } = useFilters(); 
    const url = getUrl();


    const { isPending, mutate, isSuccess, isError, reset } = useMutation({
        mutationFn: (id:number) => serverUrl.delete(`/transactions/${id}`),
        onMutate: async (id) => {
            
            await queryClient.cancelQueries(['transactions',url]);

        },
        onError: async (error, variables, context) => {
        },
        onSuccess: async (data,variables,context) => {

            // const oldData = await queryClient.getQueryData(['transactions',url]);

            // const oldData2 = structuredClone(oldData) 


            // oldData2.pages.forEach(page => {
            //     const index = page.transactions.findIndex(transaction => transaction.id === variables);
            //     if (index !== -1) {
            //         page.transactions.splice(index, 1);
            //         page.count -= 1; // Update the count if necessary
            //     }
            // });


            // await queryClient.setQueryData(['transactions',url],oldData2)

            queryClient.invalidateQueries(['transactions',url]);
            queryClient.invalidateQueries(['categories']);

        },
        onSettled: () => {
           
        }
    });

    return { isPending, mutate, isSuccess, isError, reset };
}