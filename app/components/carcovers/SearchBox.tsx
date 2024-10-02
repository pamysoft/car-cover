import React, { useState, useEffect } from 'react';
import { blankLevelInfo, CollectionInfo, LevelInfo } from '~/lib/types';
import { fetchCarCoverHierarchy, fetchMakeList, fetchModelList, fetchTrimList, isBlankLevelInfo } from '~/lib/functions';
import { useProxyUrl } from './PageWrapper';


const DependentDropdowns: React.FC<{
    selectedYear: LevelInfo;
    selectedMake: LevelInfo;
    selectedModel: LevelInfo;
    selectedTrim: LevelInfo;
    setSelectedYear: React.Dispatch<React.SetStateAction<LevelInfo>>;
    setSelectedMake: React.Dispatch<React.SetStateAction<LevelInfo>>;
    setSelectedModel: React.Dispatch<React.SetStateAction<LevelInfo>>;
    setSelectedTrim: React.Dispatch<React.SetStateAction<LevelInfo>>;
}> = ({ selectedYear, selectedMake, selectedModel, selectedTrim, setSelectedYear, setSelectedMake, setSelectedModel, setSelectedTrim }) => {
    const [availableYears, setAvailableYears] = useState<LevelInfo[]>([]);
    const [availableMakes, setAvailableMakes] = useState<LevelInfo[]>([]);
    const [availableModels, setAvailableModels] = useState<LevelInfo[]>([]);
    const [availableTrims, setAvailableTrims] = useState<LevelInfo[]>([]);
    const [invalidSelect, setInvalidSelect] = useState<string | null>(null);

    // loading variables
    const [isYearDropdownLoading, setIsYearDropdownLoading] = useState(false);
    const [isMakeDropdownLoading, setIsMakeDropdownLoading] = useState(false);
    const [isModelDropdownLoading, setIsModelDropdownLoading] = useState(false);
    const [isTrimDropdownLoading, setIsTrimDropdownLoading] = useState(false);

    const proxyUrl = useProxyUrl();

    useEffect(() => {
        const nextYear = new Date().getFullYear() + 1;
        const yearsArray: LevelInfo[] = Array.from({ length: nextYear - 1899 }, (_, i) => {
            const year = (nextYear - i).toString();  // Start from next year and go backwards
            return {
                id: year,      // Assuming `id` is the year as string
                handle: year,  // Set `handle` to the current year as string
                name: year     // Set `name` to the current year as string
            };
        });
        setAvailableYears(yearsArray);
        setSelectedYear(blankLevelInfo);
    }, [])

    useEffect(() => {
        setSelectedMake(blankLevelInfo);
        setAvailableMakes([]);
        setAvailableTrims([]);
        
        if (!isBlankLevelInfo(selectedYear)) {
            setIsMakeDropdownLoading(true)
            const fetchMakeData = async () => {
                const results = await fetchMakeList(proxyUrl, parseInt(selectedYear.handle))
                console.log('results', results)
                setAvailableMakes(results)
                setIsMakeDropdownLoading(false);
            }
            fetchMakeData()
        }
    }, [selectedYear, proxyUrl])

    useEffect(() => {
        setSelectedModel(blankLevelInfo);
        setSelectedTrim(blankLevelInfo);
        setAvailableModels([]);
        setAvailableTrims([]);

        if (!isBlankLevelInfo(selectedMake)) {
            setIsModelDropdownLoading(true)
            const fetchModelData = async () => {
                const results = await fetchModelList(proxyUrl, selectedYear.handle, selectedMake.handle)
                setAvailableModels(results)
                setIsModelDropdownLoading(false);
            }
            fetchModelData()
        }
    }, [selectedMake, proxyUrl])

    useEffect(() => {
        setSelectedTrim(blankLevelInfo);
        setAvailableTrims([]);
        if (!isBlankLevelInfo(selectedModel)) {
            setIsTrimDropdownLoading(true)
            const fetchTrimData = async () => {
                const results = await fetchTrimList(proxyUrl, selectedYear.handle, selectedMake.handle, selectedModel.handle)
                setAvailableTrims(results)
                setIsTrimDropdownLoading(false);
                maybeRedirect(results.length)
            }
            fetchTrimData()
        }
    }, [selectedModel, proxyUrl])

    useEffect(() => {
        if (!isBlankLevelInfo(selectedTrim)) {
            maybeRedirect()
        }
    }, [selectedTrim])

    const maybeRedirect = (totalTrims?: number) => {
        let parts = []
        let collectionUrl = ''
        if (selectedMake.handle && selectedModel.handle && selectedYear.handle) {
            parts.push(selectedMake.handle)
            parts.push(selectedModel.handle)
            parts.push(selectedYear.handle)

            totalTrims = totalTrims || availableTrims.length

            if (totalTrims < 2) {
                collectionUrl = '/' + parts.join('/')
                window.location.href = collectionUrl
            } else {
                if (selectedTrim.handle) {
                    parts.push(selectedTrim.handle)
                    collectionUrl = '/' + parts.join('/')
                    window.location.href = collectionUrl
                }
            }
        }
    }


    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedYear(JSON.parse(dataItem));
    };

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedMake(JSON.parse(dataItem));
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedModel(JSON.parse(dataItem));
    };

    const handleTrimChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataItem = selectedOption.getAttribute('data-item');
        setSelectedTrim(JSON.parse(dataItem));
    };


    const selectClassName = (fieldValue: string, fieldName: string) =>
        `outline-none mt-[3px] h-[33px] w-full px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] ${invalidSelect === fieldName && !fieldValue ? 'border-[2px] border-red-500' : 'border-[1px] border-[#ccc]'
        } xl:h-[41px] 2xl:h-[45px]`;

    useEffect(() => {
        if (!selectedYear.handle) {
            setInvalidSelect('year');
        } else if (!selectedMake.handle) {
            setInvalidSelect('make');
        } else if (!selectedModel.handle) {
            setInvalidSelect('model');
        } else if (!selectedTrim.handle) {
            setInvalidSelect('trim');
        }

    }, [selectedYear, selectedMake, selectedModel, selectedTrim]);


    return (
        <div>
            {/* Year Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    1. | Select Year
                </label>
                <select
                    value={selectedYear.id}
                    onChange={handleYearChange}
                    className={selectClassName(selectedYear.id, 'year')}
                    disabled={!availableYears.length}
                >
                    <option value="">Select Year</option>
                    {availableYears && availableYears
                        .map((item: LevelInfo) => (
                            <option key={item.handle} value={item.handle} data-item={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Make Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    2. | Select Make
                </label>
                <select
                    value={selectedMake.handle}
                    onChange={handleMakeChange}
                    className={selectClassName(selectedMake.id, 'make')}
                    disabled={!availableMakes.length}
                >
                    <option value="">{isMakeDropdownLoading ? 'Loading...' : 'Select Make'}</option>
                    {!isMakeDropdownLoading && availableMakes && availableMakes
                        .map((item: LevelInfo) => (
                            <option key={item.handle} value={item.handle} data-item={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Model Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    3. | Select Model
                </label>
                <select
                    value={selectedModel.id}
                    onChange={handleModelChange}
                    className={selectClassName(selectedModel.id, 'model')}
                    disabled={!availableModels.length}
                >
                    <option value="">{isModelDropdownLoading ? 'Loading...' : 'Select Model'}</option>
                    {!isModelDropdownLoading && availableModels && availableModels
                        .map((item: LevelInfo) => (
                            <option key={item.id} value={item.id} data-item={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Trim Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    4. | Select Trim
                </label>
                <select
                    value={selectedTrim.id}
                    onChange={handleTrimChange}
                    className={selectClassName(selectedTrim.id, 'trim')}
                    disabled={!availableTrims.length}
                >
                    <option value="">{isTrimDropdownLoading ? 'Loading...' : 'Select Trim'}</option>
                    {!isTrimDropdownLoading && availableTrims && availableTrims
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

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
    const [selectedYear, setSelectedYear] = useState<LevelInfo>(blankLevelInfo);
    const [selectedMake, setSelectedMake] = useState<LevelInfo>(blankLevelInfo);
    const [selectedModel, setSelectedModel] = useState<LevelInfo>(blankLevelInfo);
    const [selectedTrim, setSelectedTrim] = useState<LevelInfo>(blankLevelInfo);

    const handleSubmit = () => {
        if (!selectedYear.handle || !selectedModel.handle || !selectedModel.handle || !selectedTrim.handle) {
            alert('Please select all options before searching.');
            return;
        }

        // Construct the URL based on the selected options
        const url = `/${selectedMake.handle}/${selectedModel.handle}/${selectedYear.handle}/${selectedTrim.handle}`;

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
                                VEHICLE COVER SEARCH
                            </div>
                            <DependentDropdowns
                                selectedYear={selectedYear}
                                selectedMake={selectedMake}
                                selectedModel={selectedModel}
                                selectedTrim={selectedTrim}
                                setSelectedYear={setSelectedYear}
                                setSelectedMake={setSelectedMake}
                                setSelectedModel={setSelectedModel}
                                setSelectedTrim={setSelectedTrim}
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