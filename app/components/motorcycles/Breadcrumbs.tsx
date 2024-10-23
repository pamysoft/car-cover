import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { stripSlashes, fetchRvcoverBreadcrumbs, fetchData } from "~/lib/functions"
import { PathwayInfo } from "~/lib/types"
import { useProxyUrl } from "../common/PageWrapper"
import { useLocation } from "@remix-run/react"

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()
  const pathway = breadcrumbs.pathway
  const isLoading = breadcrumbs.isLoading

  return <>{pathway && <div className="container font-[Oswald] text-[#666]">
    <ul className="mb-[20px] mt-[20px] flex flex-wrap lg:mt-0">
      <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
        <a href="/" title="Go to Home Page">CarCover.com</a>
      </li>
      <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
        <a href="/motorcycle-covers" title="Motorcycle Covers">Motorcycle Covers</a>
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


type BreadcrumbContextValue = {
  pathway: PathwayInfo[];
  isLoading: boolean;
  relativeUrl: string;
  catalogTitle: string;
  trimText: string;
};
const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

Breadcrumbs.Provider = function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [pathway, setPathway] = useState<PathwayInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const proxyUrl = useProxyUrl();
  const location = useLocation();
  const path = stripSlashes(location.pathname)
  const [catalogTitle, setCatalogTitle] = useState('')
  const [trimText, setTrimText] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let pathwayData: PathwayInfo[] = []
      setIsLoading(true)
      pathwayData = await fetchBreadcrumbs(proxyUrl, path)

      setPathway(pathwayData)

      if (pathwayData.length == 3) {
        setTrimText(pathwayData[pathwayData.length - 1].name)
      }

      let categoryTitles = pathwayData.slice(0, 3)
      const categoryTitleNames = categoryTitles.map(item => item.name)
      categoryTitleNames.push('Covers')
      setCatalogTitle(categoryTitleNames.join(' '))

      setIsLoading(false)
    }
    fetchData()
  }, [proxyUrl])

  return (
    <BreadcrumbContext.Provider
      value={{
        pathway: pathway,
        isLoading: isLoading,
        relativeUrl: path,
        catalogTitle: catalogTitle,
        trimText: trimText
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export function useBreadcrumbs() {
  const breadcrumbs = useContext(BreadcrumbContext);
  if (!breadcrumbs) {
    throw new Error('useBreadcrumbs must be used within an BreadcrumbsProvider');
  }
  return breadcrumbs;
}

export const fetchBreadcrumbs = async (proxyUrl: string, path: string) => {
  const endpoint = `scooters-get-breadcrumbs/${encodeURIComponent(path)}?shop=1`;
  return await fetchData(proxyUrl, endpoint);
};