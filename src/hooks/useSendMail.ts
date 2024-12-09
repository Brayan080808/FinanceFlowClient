import { useMutation } from "@tanstack/react-query";
import serverUrl from "../service/server";

interface EmailForm{
    to:string;
    subject:string;
    text:string;
}

export default function(){
    const { isError, isPending, isSuccess, mutate, reset } = useMutation({
        mutationFn: async ({to,subject,text}:EmailForm) => await serverUrl.post("mail/send",{
            to,subject,text
        }),
    })

    return { isError, isPending, isSuccess, mutate, reset };
}