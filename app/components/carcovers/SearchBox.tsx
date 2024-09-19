import React, { useState, useEffect } from 'react';
import { CollectionInfo, LevelInfo } from '~/lib/types';
import { getCarCoverHierarchy } from '~/lib/functions';

const filterData: CollectionInfo[] = []


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

    useEffect(() => {
        setIsYearDropdownLoading(true);
        const fetchYearData = async () => {
            const results = await getCarCoverHierarchy()
            setAvailableYears(results)
            setIsYearDropdownLoading(false);
        }
        fetchYearData()
    }, [])

    useEffect(() => {
        setSelectedMake('');
        setAvailableMakes([]);
        setAvailableTrims([]);

        if (selectedYear) {
            setIsMakeDropdownLoading(true)
            const fetchMakeData = async () => {
                const results = await getCarCoverHierarchy(parseInt(selectedYear.id))
                setAvailableMakes(results)
                setIsMakeDropdownLoading(false);
            }
            fetchMakeData()
        }
    }, [selectedYear])

    useEffect(() => {
        setSelectedModel('');
        setSelectedTrim('');
        setAvailableModels([]);
        setAvailableTrims([]);

        if (selectedMake) {
            setIsModelDropdownLoading(true)
            const fetchModelData = async () => {
                const results = await getCarCoverHierarchy(parseInt(selectedMake.id))
                setAvailableModels(results)
                setIsModelDropdownLoading(false);
            }
            fetchModelData()
        }
    }, [selectedMake])

    useEffect(() => {
        setSelectedTrim('');
        setAvailableTrims([]);
        if (selectedModel) {
            setIsTrimDropdownLoading(true)
            const fetchTrimData = async () => {
                const results = await getCarCoverHierarchy(parseInt(selectedModel.id))
                setAvailableTrims(results)
                setIsTrimDropdownLoading(false);
                maybeRedirect(results.length)
            }
            fetchTrimData()
        }
    }, [selectedModel])

    useEffect(() => {
        if (selectedTrim) {
            maybeRedirect()
        }
    }, [selectedTrim])

    const maybeRedirect = (totalTrims?: number) => {
        let parts = []
        let collectionUrl = ''
        if (selectedMake && selectedModel && selectedYear) {
            parts.push(selectedMake.handle)
            parts.push(selectedModel.handle)
            parts.push(selectedYear.handle)

            totalTrims = totalTrims || availableTrims.length

            if (totalTrims < 2) {
                collectionUrl = '/' + parts.join('/')
                window.location.href = collectionUrl
            } else {
                if (selectedTrim) {
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
        if (!selectedYear) {
            setInvalidSelect('year');
        } else if (!selectedMake) {
            setInvalidSelect('make');
        } else if (!selectedModel) {
            setInvalidSelect('model');
        } else if (!selectedTrim) {
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
                    <option value="">{isYearDropdownLoading ? 'Loading...' : 'Select Year'}</option>
                    {!isYearDropdownLoading && availableYears && availableYears
                        .map((item: LevelInfo) => (
                            <option key={item.id} value={item.id} data-item={JSON.stringify(item)}>
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
                    value={selectedMake.id}
                    onChange={handleMakeChange}
                    className={selectClassName(selectedMake.id, 'make')}
                    disabled={!availableMakes.length}
                >
                    <option value="">{isMakeDropdownLoading ? 'Loading...' : 'Select Make'}</option>
                    {!isMakeDropdownLoading && availableMakes && availableMakes
                        .map((item: LevelInfo) => (
                            <option key={item.id} value={item.id} data-item={JSON.stringify(item)}>
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
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedTrim, setSelectedTrim] = useState<string>('');

    const handleSubmit = () => {
        if (!selectedYear || !selectedModel || !selectedModel || !selectedTrim) {
            alert('Please select all options before searching.');
            return;
        }

        // Construct the URL based on the selected options
        const url = `/${selectedModel}/${selectedModel}/${selectedYear}/${selectedTrim}`;

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