import { fetchCarCoverHierarchyByHandle, toTitleCase } from '~/lib/functions';

import { SearchBox } from './SearchBox';
import { Slideshow } from '../carcovers/Slideshow';

import { BlockType, HtmlBlockType, PathwayInfo, TextBlockType } from '~/lib/types';
import { useEffect, useState } from 'react';

import { CategoryType, useCategory, useProxyUrl } from '../carcovers/PageWrapper';
import { useBreadcrumbs } from './Breadcrumbs';
import { StaticContentProvider, usePageBlocks } from '../carcovers/StaticContentProvider';


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
        fetchData()
    }, [])

    const blocks = usePageBlocks()

    return <>
        <div className='container mt-[20px] lg:mt-0'>
            <div className='md:gap-0 ml:flex'>
                <SearchBox className="ml:w-1/4" />                
                <Slideshow className="mt-[30px] ml:mt-0 ml:w-3/4 ml:pl-[15px]" />
            </div>
        </div>
        <div className='pb-[100px]'>
            {blocks && blocks.map(block => {
                return (
                    <>
                        {(block.type == BlockType.HTML) && <div dangerouslySetInnerHTML={{ __html: (block.content as HtmlBlockType).html }} />}
                        {(block.type == BlockType.Text) && <>
                            <div className="container">
                                <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium leading-[1.2]">{(block.content as TextBlockType).title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: (block.content as TextBlockType).text }} />
                            </div>
                        </>}
                    </>
                )
            })}
        </div>
        {/* <StaticContent dynamicText={dynamicText} />
        <ValueProposition />
        <CarCoverTypes />
        <CarCoverComparison />
        <CarModelYearSelector path={path} /> */}
    </>
}

function StaticContent({ dynamicText }) {
    return <>
        <div className="container">
            <h1 className="mb-[20px] mt-[22px] text-[30px] font-medium">{dynamicText} Car Covers</h1>
            <div className="">
                <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium leading-[1.2]">Buy the Best {dynamicText} Car Cover</h2>
                <p>
                    At CarCover.com, buying a custom car cover is made easy. With a selection of over one hundred thousand outdoor, indoor, and waterproof covers, we're confident you'll find the cover for your needs. Whether you are looking for a custom fit cover, or an universal one, we have the vehicle cover you are looking, and at the best price. Browse our collection today and have your car cover shipped to you hassle-free.
                </p>
                <p>
                    For a limited time only, take advantage of our special offer: enjoy up to 60% off and free expedited shipping on all orders placed with CarCover.com. Additionally, every purchase of our top-of-the-line custom car covers comes with a lifetime warranty, providing you with peace of mind and assurance in the quality of our products. Don't miss out on this deal to protect your {dynamicText} with a high-quality vehicle cover. Shop now!
                </p>

                <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium">Why You Need a {dynamicText} Car Cover</h2>
                <p>Whether you're looking for custom covers that protect your beloved classic car outdoors or superior protection for your sportscar in your garage, CarCover.com is the internet's premium choice for outstanding car covers.</p>
                <p>
                    A car cover is essential for protecting your vehicle, whether you park it outdoors or indoors. It shields your car from various environmental hazards, including damaging UV rays that can fade paint and deteriorate the interior. Weatherproof covers are particularly beneficial, as they guard against rain, snow, and bird droppings, preventing rust and stains. Dust and debris are kept at bay, preserving the car's finish and reducing the need for frequent washes. Additionally, using a car cover helps maintain your car's resale value by keeping it in pristine condition. Furthermore, a car cover acts as a deterrent to theft and vandalism by keeping your vehicle out of sight when parked outdoor. Overall, investing in a car cover ensures your car's appearance and longevity.
                </p>
            </div>
        </div>

    </>
}