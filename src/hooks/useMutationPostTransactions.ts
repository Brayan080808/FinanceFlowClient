import { useMutation, useQueryClient } from "@tanstack/react-query";
import serverUrl from "../service/server";
import useFilters from "../store/useFilters";

interface Transaction {
    name: string;
    amount: number;
    category: string;
    procesado?: boolean;
  }

interface previousTransaction{
    pageParams: number[];
    pages: string[];
}

export default function useMutationPostTransactions(){
    const queryClient = useQueryClient();
    const { getUrl } = useFilters();
    const url = getUrl();


    const addToComment = useMutation({
        mutationFn: async (data:Transaction) => await serverUrl.post('/transactions',data),

        onMutate:  async (data:Transaction) => {
            await queryClient.cancelQueries(['transactions',url]);

            const previousTransaction = await queryClient.getQueryData(['transactions',url]);
            const updateTransaction = structuredClone(previousTransaction);
            console.log("pasooo")
            const newTransaction = structuredClone(data);

            newTransaction.procesado = true;

            updateTransaction?.pages[0].transactions.unshift(newTransaction);

            await queryClient.setQueryData(['transactions',url],updateTransaction)

            return { previousTransaction }

        },
        onError: (error) => {
            console.log("Paso por el error")
        },
        onSuccess: async () => {
            console.log("Success")
            await queryClient.invalidateQueries(['transactions',url]);
            await queryClient.invalidateQueries(['categories']);


        },
        onSettled: async () => {
            console.log("Settled")
        } 
    });


    return addToComment;

}

