import useFetch from "../../services/useFetch";

export default function KarmaScore({ url }:any) {
    const {data,error,loading}= useFetch(url)
    return (
        <>
            {loading && <span>... Loading ...</span>}
            {error && <span>... Error ...</span>}
            {data && <span>{data.karma}</span>}
        </>
    )
}

