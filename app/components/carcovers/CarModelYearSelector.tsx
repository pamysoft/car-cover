import { useEffect, useState } from "react"
import { getCarCoverDataByPath } from "~/lib/functions"

export function CarModelYearSelector({ path }) {
    const [data, setData] = useState({
        title: '',
        results: []
    })

    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await getCarCoverDataByPath(path)
            setData(result)

            setIsLoading(false)
        }
        fetchData()
    }, [])

    return <div className="mb-[20px] mt-10">
        {isLoading && <div>Loading..</div>}
        {!isLoading && data && <div className="container">
            <h2 className="mb-[20px] mt-10 text-[28px] font-medium">{data.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
                {data.results.map(item => <div>
                    <a className="text-[14px]" href={item.handle}>{item.title}</a>
                </div>)}
            </div>
        </div>}
    </div>
}