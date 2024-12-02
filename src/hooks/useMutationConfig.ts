import { useMutation } from "@tanstack/react-query";
import serverUrl from "../service/server";

interface Config{
    selectedCurrency: string;
    expenseTags: string[];
    incomeTags: string[];
}

const useMutationConfig = () => {
    const { mutate, isPending, isSuccess, isError, reset } = useMutation({    
        mutationFn: ({ selectedCurrency, expenseTags, incomeTags }:Config) => serverUrl.patch('/users/config',{ selectedCurrency, expenseTags, incomeTags }),

    
    })
    return { mutate, isPending, isSuccess, isError, reset }
} 
export default useMutationConfig;
