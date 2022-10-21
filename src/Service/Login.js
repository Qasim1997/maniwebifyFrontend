import { useMutation,useQuery } from "react-query"
import axios from 'axios'

export const useLoginUser = () => useMutation((data)=>axios.post('http://127.0.0.1:8000/api/admin/login', {
            email: data.email,
            password: data.password
          }),
    {onSuccess:(data)=>{
        console.log("Login Valid")
    },onError:()=>{
        console.log("inValid User")
    }})


export const useGetAllBrands = () => useQuery(["CustomqueryName"],() => axios.get("route"))
//   const {data,isLoading} = useGetAllBrands()
// jahan data fetch karna ha
