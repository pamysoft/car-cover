import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { fetchVehicleByPath, stripSlashes } from "~/lib/functions"
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
      pathwayData = []
      setIsLoading(true)
      const vehicleData = await fetchVehicleByPath(proxyUrl, path)
      if (vehicleData == null) {
        setIsLoading(false)
        return
      }

      let currentUrl = '/car-covers/'
      if (vehicleData.makeHandle) {
        currentUrl = currentUrl + vehicleData.makeHandle

        pathwayData.push({
          name: vehicleData.makeTitle,
          handle: currentUrl
        })
      }
      if (vehicleData.modelHandle) {
        currentUrl = currentUrl + '/' + vehicleData.modelHandle

        pathwayData.push({
          name: vehicleData.modelTitle || '',
          handle: currentUrl
        })
      }
      if (vehicleData.year) {
        currentUrl = currentUrl + '/' + vehicleData.year

        pathwayData.push({
          name: vehicleData.year,
          handle: currentUrl
        })
      }
      if (vehicleData.trimHandle) {
        currentUrl = currentUrl + '/' + vehicleData.trimHandle

        pathwayData.push({
          name: vehicleData.trimTitle || '',
          handle: currentUrl
        })
      }
      setPathway(pathwayData)

      if (pathwayData.length == 4) {
        setTrimText(pathwayData[pathwayData.length - 1].name)
      }

      let categoryTitles = pathwayData.slice(0, 3)
      const categoryTitleNames = categoryTitles.map(item => item.name)
      categoryTitleNames.push('Car Covers')
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
