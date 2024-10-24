import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { Block, PageSettingsData } from "~/lib/types";
import { CategoryType, useCategory, useProxyUrl } from "./PageWrapper";
import { Loading } from "./Loading";

type StaticContentContextValue = {
    settings: PageSettingsData;
    blocks: Block[];
    isLoading: boolean;
};


const StaticContentContext = createContext<StaticContentContextValue | null>(null);

function getAppProxyUrl(proxyUrl: string, category: CategoryType): string
{
    let pageId: Number;
    switch (category) {
        case CategoryType.RvCovers:
            pageId = 2;
            break;
        case CategoryType.RvCoversChildren:
            pageId = 2;
            break;
        case CategoryType.CarCovers:
            pageId = 1;
            break;
        case CategoryType.CarCoversChildren:
            pageId = 3;
            break;
        default:
            pageId = 1;
            break;
    }
    return proxyUrl + `get-page-data/${pageId}`
}

export function StaticContentProvider({ children }: { children?: React.ReactNode }) {
    // const data: StaticContentContextValue
    const proxyUrl = useProxyUrl()
    const category = useCategory()
    const appProxyUrl = getAppProxyUrl(proxyUrl, category);
    const [data, setData] = useState<StaticContentContextValue | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // loading data
        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetch(appProxyUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsLoading(false)
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json() as StaticContentContextValue;
            console.log('result:', result)

            setData(result)
        }
        fetchData();
        
        // setData({
        //     blocks:[],
        //     settings:{
        //         bannerImage:''
        //     }
        // })
    }, [, category])

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && data && <StaticContentContext.Provider value={data}>{children}</StaticContentContext.Provider>}
        </>
        )
}

export function usePageBlocks() {
    const wrapper = useContext(StaticContentContext)
    if (!wrapper) {
        throw new Error('usePageBlocks must be used within an StaticContentProvider');
    }
    return wrapper.blocks
}

export function usePageSettings() {
    const wrapper = useContext(StaticContentContext)
    if (!wrapper) {
        throw new Error('usePageSettings must be used within an StaticContentProvider');
    }
    return wrapper.settings
}