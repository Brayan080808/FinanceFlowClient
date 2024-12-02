import { useMutation } from "@tanstack/react-query";
import serverUrl from "../service/server";

export default function(){
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: async ({to,subject,text}) => await serverUrl.post("mail/send",{
            to,subject,text
        }),
    })

    return { isError, isPending, isSuccess, mutate };
}