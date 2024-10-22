import { fetchCarCoverHierarchyByHandle, toTitleCase } from '~/lib/functions';
import { SearchBox } from './SearchBox';
import { Slideshow } from '../common/Slideshow';
import { BlockType, HtmlBlockType, TextBlockType } from '~/lib/types';
import { Suspense, useEffect, useState } from 'react';
import { useCategory, useProxyUrl } from '../common/PageWrapper';
import { useBreadcrumbs } from './Breadcrumbs';
import { usePageBlocks } from '../common/StaticContentProvider';
import { Loading } from '../common/Loading';


export function CategoryStaticContent() {
    const [dynamicText, setDynamicText] = useState('')
    const proxyUrl = useProxyUrl();
    const breadcrumbs = useBreadcrumbs()
    const path = breadcrumbs.relativeUrl
    const category = useCategory()

    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await fetchCarCoverHierarchyByHandle(proxyUrl, path)
            let parts: string[] = []
            data.forEach(item => parts.push(item.name))
            setDynamicText(parts.join(' '))
            setIsLoading(false)
        }
        if (path) {
            fetchData()
        }
    }, [])

    const blocks = usePageBlocks()

    return <>
        <Suspense fallback={<Loading />}>
            {isLoading && <Loading />}
            {!isLoading &&
                <>
                    <div className='container mt-[20px] lg:mt-0'>
                        <div className='md:gap-0 ml:flex'>
                            <SearchBox className="ml:w-1/4" />
                            <Slideshow className="mt-[30px] ml:mt-0 ml:w-3/4 ml:pl-[15px]" />
                        </div>
                    </div>
                    <div className='pb-[100px]'>
                        {blocks && blocks.map(block => {
                            return (
                                <div key={block.id}>
                                    {(block.type == BlockType.HTML) && <div dangerouslySetInnerHTML={{ __html: (block.content as HtmlBlockType).html }} />}
                                    {(block.type == BlockType.Text) && <>
                                        <div className="container">
                                            <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium leading-[1.2]">{(block.content as TextBlockType).title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: (block.content as TextBlockType).text }} />
                                        </div>
                                    </>}
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </Suspense>
    </>
}