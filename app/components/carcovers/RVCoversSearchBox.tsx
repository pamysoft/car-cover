import React, { useState, useEffect } from 'react';
import { blankLevelInfo, CollectionInfo, LevelInfo } from '~/lib/types';
import { fetchCarCoverHierarchy, fetchMakeList, fetchModelList, fetchSizeList, fetchTrimList, isBlankLevelInfo } from '~/lib/functions';
import { useProxyUrl } from './PageWrapper';

const DependentDropdowns: React.FC<{
    selectedType: LevelInfo;    
    selectedSize: LevelInfo;
    setSelectedType: React.Dispatch<React.SetStateAction<LevelInfo>>;
    setSelectedSize: React.Dispatch<React.SetStateAction<LevelInfo>>;
}> = ({ selectedType, selectedSize, setSelectedType, setSelectedSize }) => {
    const [availableTypes, setAvailableTypes] = useState<LevelInfo[]>([]);
    const [availableSizes, setAvailableSizes] = useState<LevelInfo[]>([]);    
    const [invalidSelect, setInvalidSelect] = useState<string | null>(null);

    // loading variables
    const [isSizeDropdownLoading, setIsSizeDropdownLoading] = useState(false);

    const proxyUrl = useProxyUrl();

    useEffect(() => {
        const typesArray: LevelInfo[] = TYPE_LIST.map(item => {
            return {
                id: item.handle,
                handle: item.handle,
                name: item.name
            };
        });
        setAvailableTypes(typesArray);
        setSelectedType(blankLevelInfo);
    }, [])

    useEffect(() => {
        setSelectedSize(blankLevelInfo);
        setAvailableSizes([]);
        
        if (!isBlankLevelInfo(selectedType)) {
            setIsSizeDropdownLoading(true)
            const fetchMakeData = async () => {
                const results = await fetchSizeList(proxyUrl, selectedType.handle)
                console.log('results', results)
                setAvailableSizes(results)
                setIsSizeDropdownLoading(false);
            }
            fetchMakeData()
        }
    }, [selectedType, proxyUrl])


    useEffect(() => {
        if (!isBlankLevelInfo(selectedSize)) {
            maybeRedirect()
        }
    }, [selectedSize])

    const maybeRedirect = (totalSizes?: number) => {
        let parts = []
        let collectionUrl = ''
        parts.push('rv-covers')
        if (selectedSize.handle && selectedType.handle) {
            parts.push(selectedType.handle)
            parts.push(selectedSize.handle)

            totalSizes = totalSizes || availableSizes.length

            if (totalSizes && totalSizes < 2) {
                collectionUrl = '/' + parts.join('/')
                window.location.href = collectionUrl
            } else {
                if (selectedSize.handle) {
                    parts.push(selectedSize.handle)
                    collectionUrl = '/' + parts.join('/')
                    window.location.href = collectionUrl
                }
            }
        }
    }


    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedType(JSON.parse(dataItem));
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedSize(JSON.parse(dataItem));
    };


    const selectClassName = (fieldValue: string, fieldName: string) =>
        `outline-none mt-[3px] h-[33px] w-full px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] ${invalidSelect === fieldName && !fieldValue ? 'border-[2px] border-red-500' : 'border-[1px] border-[#ccc]'
        } xl:h-[41px] 2xl:h-[45px]`;

    useEffect(() => {
        if (!selectedType.handle) {
            setInvalidSelect('type');
        } else if (!selectedSize.handle) {
            setInvalidSelect('size');
        }
    }, [selectedType, selectedSize]);

    
    return (
        <div>
            {/* Year Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    1. | Select Type
                </label>
                <select
                    value={selectedType.id}
                    onChange={handleTypeChange}
                    className={selectClassName(selectedType.id, 'type')}
                    disabled={!availableTypes.length}
                >
                    <option value="">Select Type</option>
                    {availableTypes && availableTypes
                        .map((item: LevelInfo) => (
                            <option key={item.handle} value={item.handle} data-item={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Trim Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    4. | Select Size
                </label>
                <select
                    value={selectedSize.id}
                    onChange={handleSizeChange}
                    className={selectClassName(selectedSize.id, 'size')}
                    disabled={!availableSizes.length}
                >
                    <option value="">{isSizeDropdownLoading ? 'Loading...' : 'Select Size'}</option>
                    {!isSizeDropdownLoading && availableSizes && availableSizes
                        .map((item: LevelInfo) => (
                            <option key={item.id} value={item.id} data-item={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
};


interface SearchBoxProps {
    className: string;
}

export const RVCoversSearchBox: React.FC<SearchBoxProps> = ({ className }) => {
    const [selectedType, setSelectedType] = useState<LevelInfo>(blankLevelInfo);
    const [selectedSize, setSelectedSize] = useState<LevelInfo>(blankLevelInfo);

    const handleSubmit = () => {
        if (!selectedType.handle || !selectedSize.handle) {
            alert('Please select all options before searching.');
            return;
        }

        // Construct the URL based on the selected options
        const url = `/${selectedSize.handle}/${selectedSize.handle}/${selectedType.handle}/${selectedSize.handle}`;

        // Redirect to the constructed URL
        window.location.href = url;
    };

    return (
        <div className={className}>
            <form className="h-full max-w-none" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="h-full border-[1px] border-solid border-[#333] p-[10px]">
                    <div className="flex h-full flex-col justify-between gap-[35px]">
                        <div>
                            <div className="flex h-[35px] items-center justify-center bg-[#ff0000] p-[3px] text-center font-[Oswald] text-[18px] text-[#ffffff]">
                                RV COVER SEARCH
                            </div>
                            <DependentDropdowns
                                selectedType={selectedType}
                                selectedSize={selectedSize}
                                setSelectedType={setSelectedType}
                                setSelectedSize={setSelectedSize}
                            />
                        </div>
                        <div className="flex justify-between ml:mt-0">
                            <button type="reset" className="bg-[#505050] px-[25px] py-[6px] font-[Rubik] text-[13px] font-medium text-white">
                                RESET
                            </button>
                            <button
                                type="submit"
                                className="bg-[#505050] px-[25px] py-[6px] font-[Rubik] text-[13px] font-medium text-white"
                            >
                                SEARCH
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
};

const TYPE_LIST = [
    {handle: "class-a", name:"Class A"},
    {handle: "class-b", name:"Class B"},
    {handle: "class-c", name:"Class C"},
    {handle: "fifth-wheel-trailer", name:"Fifth Wheel Trailer"},
    {handle: "folding-pop-up-camper", name:"Folding Pop-Up Camper"},
    {handle: "teardrop-trailer", name:"Teardrop Trailer"},
    {handle: "travel-trailer", name:"Travel Trailer"},
    {handle: "truck-camper", name:"Truck Camper"},
]