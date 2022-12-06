import { useEffect,useState } from "react";

export default  function useFetch(url:string){
    const [data,setData] = useState<any>(null)
    const [error,setError] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response:any = await fetch(url)
                    
                    if(response.ok){
                        setLoading(false)
                        const data = await response.json()
                        setData(data)
                    }
                }catch(err:any){
                    setLoading(false)
                    setError(true)
                }
                    setLoading(false)
            }
        )()
    }, [url])

    return { data, error, loading }

}
  