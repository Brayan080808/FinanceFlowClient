import { useMutation } from "@tanstack/react-query"
import serverUrl from "../service/server"

export default function usePostLogin(){

    const { mutate, isPending, isError, data, isSuccess} = useMutation({
        mutationFn: async ({code,provider}) => await serverUrl.post("users/login",{
            'code':code,
            "siteProvider":provider,
        }),

        onMutate:  async () => {
        }}
    )

    return{ isPending, isError, data, mutate, isSuccess}
}