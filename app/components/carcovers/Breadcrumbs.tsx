import { useEffect, useState } from "react"
import { fetchCarCoverHierarchyByHandle } from "~/lib/functions"
import { PathwayInfo } from "~/lib/types"
import { useProxyUrl } from "./PageWrapper"

export function Breadcrumbs({ path }) {
    const [pathway, setPathway] = useState<PathwayInfo[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const proxyUrl = useProxyUrl();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await fetchCarCoverHierarchyByHandle(proxyUrl, path)
            let pathwayData: PathwayInfo[] = []
            let currentUrl = '/'

            data.forEach((item, index) => {
                if (index == data.length-1) {
                    currentUrl = ''
                } else {
                    currentUrl = currentUrl + item.handle + '/'
                }
                pathwayData.push({
                    name: item.name,
                    handle: currentUrl
                })
            })
            setPathway(pathwayData)

            setIsLoading(false)
        }
        fetchData()
    }, [])

    return <>{pathway && <div className="container font-[Oswald] text-[#666]">
        <ul className="mb-[20px] mt-[20px] flex flex-wrap lg:mt-0">
            <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
                <a href="/" title="Go to Home Page">Car Covers</a>
            </li>
            <>
            {isLoading && <li className="flex items-center">Loading..</li>}
            {!isLoading && pathway.map(item => <div key={item.handle}>
                {item.handle && <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']"><a href={item.handle} title={item.name}>{item.name}</a></li>}
                {!item.handle && <li className="flex items-center"><strong title={item.name}>{item.name}</strong></li>}
                </div>
            )}
            </>
        </ul>
    </div>}
    </>
}