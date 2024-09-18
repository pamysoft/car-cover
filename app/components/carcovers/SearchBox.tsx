import React, { useState, useEffect } from 'react';
import { useCollections } from './PageWrapper';
import { CollectionInfo, LevelInfo } from '~/lib/types';
import { getMakes, getModels, getTrims, getYears } from '~/lib/functions';

const filterData: CollectionInfo[] = []


const DependentDropdowns: React.FC<{
    selectedYear: string;
    selectedMake: string;
    selectedModel: string;
    selectedTrim: string;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
    setSelectedMake: React.Dispatch<React.SetStateAction<string>>;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTrim: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedYear, selectedMake, selectedModel, selectedTrim, setSelectedYear, setSelectedMake, setSelectedModel, setSelectedTrim }) => {
    const [availableMakes, setAvailableMakes] = useState<LevelInfo[]>([]);
    const [availableModels, setAvailableModels] = useState<LevelInfo[]>([]);
    const [availableTrims, setAvailableTrims] = useState<LevelInfo[]>([]);
    const [invalidSelect, setInvalidSelect] = useState<string | null>(null);

    const filterData: CollectionInfo[] = useCollections();

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const yearHandle = event.target.value;
        setSelectedYear(yearHandle);

        if (yearHandle) {
            const makes = getMakes(filterData, yearHandle);
            setAvailableMakes(makes);
        } else {
            setAvailableMakes([]);
        }
        setSelectedMake('');
        setAvailableModels([]);
        setAvailableTrims([]);
    };

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const makeHandle = event.target.value;        
        setSelectedMake(makeHandle);

        if (makeHandle && selectedYear) {
            const models = getModels(filterData, selectedYear, makeHandle)
            setAvailableModels(models);
        } else {
            setAvailableModels([]);
        }
        setSelectedModel('');
        setAvailableTrims([]);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const modelHandle = event.target.value;
        setSelectedModel(modelHandle);

        if (modelHandle && selectedMake && selectedYear) {
            const trims =  getTrims(filterData, selectedYear, selectedMake, modelHandle)
            setAvailableTrims(trims);
        } else {
            setAvailableTrims([]);
        }
    };

    const handleTrimChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const trimHandle = event.target.value;
        setSelectedTrim(trimHandle);
    }

    const availableYears = getYears(filterData)
    const selectClassName = (fieldValue: string, fieldName: string) =>
        `outline-none mt-[3px] h-[33px] w-full px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] ${
          invalidSelect === fieldName && !fieldValue ? 'border-[2px] border-red-500' : 'border-[1px] border-[#ccc]'
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

        let parts = []
        let collectionUrl = ''
        if (selectedMake && selectedModel && selectedYear) {
            parts.push(selectedMake)
            parts.push(selectedModel)
            parts.push(selectedYear)
            
            if (selectedTrim) {
                parts.push(selectedTrim)
            } else {
                console.log('has trim: ', availableTrims.length)
            }
            collectionUrl = parts.join('/')
        }

        console.log('collectionUrl=', collectionUrl)
    }, [selectedYear, selectedMake, selectedModel, selectedTrim]);


    return (
        <div>
            {/* Year Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    1. | Select Year
                </label>
                <select 
                    value={selectedYear} 
                    onChange={handleYearChange}
                    className={selectClassName(selectedYear, 'year')}
                >
                    <option value="">Select Year</option>
                    {availableYears
                        .map(({ handle, title }) => (
                            <option key={handle} value={handle}>
                                {title}
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
                    value={selectedMake} 
                    onChange={handleMakeChange}
                    disabled={!availableMakes.length}
                    className={selectClassName(selectedMake, 'make')}
                >
                    <option value="">Select Make</option>
                    {availableMakes.map(({ handle, title }) => (
                        <option key={handle} value={handle}>
                            {title}
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
                    value={selectedModel} 
                    onChange={handleModelChange}
                    disabled={!availableModels.length}
                    className={selectClassName(selectedModel, 'model')}
                >
                    <option value="">Select Model</option>
                    {availableModels.map(({ handle, title }) => (
                        <option key={handle} value={handle}>
                            {title}
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
                    value={selectedTrim} 
                    onChange={handleTrimChange}
                    disabled={!availableTrims.length}
                    className={selectClassName(selectedTrim, 'trim')}
                >
                    <option value="">Select Trim</option>
                    {availableTrims.map(({ handle, title }) => (
                        <option key={handle} value={handle}>
                            {title}
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
        if (!selectedYear || !selectedMake || !selectedModel || !selectedTrim) {
            alert('Please select all options before searching.');
            return;
        }
        
        // Construct the URL based on the selected options
        const url = `/${selectedMake}/${selectedModel}/${selectedYear}/${selectedTrim}`;
        
        // Redirect to the constructed URL
        window.location.href = url;
    };

    return (
        <div className={className}>
            <form  className="h-full max-w-none" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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