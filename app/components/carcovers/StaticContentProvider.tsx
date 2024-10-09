import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { Block, PageSettingsData } from "~/lib/types";
import { CategoryType, useCategory, useProxyUrl } from "./PageWrapper";

type StaticContentContextValue = {
    settings: PageSettingsData;
    blocks: Block[];
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

    useEffect(() => {
        // loading data
        console.log('Fetchdata....')
        const fetchData = async () => {
            const response = await fetch(appProxyUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json() as StaticContentContextValue;
            console.log('result:', result)

            setData(result)
        }
        fetchData();
    }, [, category])

    const Loading = <div>Loading static content...</div>

    return <Suspense fallback={Loading}>
        <>
            {data && <StaticContentContext.Provider value={data}>{children}</StaticContentContext.Provider>}
        </>
    </Suspense>
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