import React, { useState } from 'react';

interface FilterItem {
    level1: string; // Make
    level2: string; // Model
    level3: string; // Year
    level4: string; // Type (SUV, Sedan, etc.)
}

const filterData: FilterItem[] = [
    { level1: 'acura', level2: 'mdx', level3: '2025', level4: 'suv' },
    { level1: 'bmw', level2: '335i', level3: '2025', level4: 'sedan' },
    { level1: 'honda', level2: 'civic', level3: '2025', level4: 'coupe' },
    { level1: 'honda', level2: 'civic', level3: '2025', level4: 'sedan' },
    { level1: 'jeep', level2: 'wrangler', level3: '2024', level4: 'suv' },
    { level1: 'audi', level2: 's3', level3: '2024', level4: 'sedan' },
    { level1: 'land rover', level2: 'range rover sport', level3: '2024', level4: 'suv' },
    { level1: 'vinfast', level2: 'vf9', level3: '2024', level4: 'suv' }
];

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
    const [availableMakes, setAvailableMakes] = useState<string[]>([]);
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [availableTrims, setAvailableTrims] = useState<string[]>([]);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        setSelectedYear(year);

        if (year) {
            const makes = Array.from(new Set(
                filterData
                    .filter(item => item.level3 === year)
                    .map(item => item.level1)
            ));
            setAvailableMakes(makes);
        } else {
            setAvailableMakes([]);
        }
        setSelectedMake('');
        setAvailableModels([]);
        setAvailableTrims([]);
    };

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const make = event.target.value;
        setSelectedMake(make);

        if (make && selectedYear) {
            const models = Array.from(new Set(
                filterData
                    .filter(item => item.level3 === selectedYear && item.level1 === make)
                    .map(item => item.level2)
            ));
            setAvailableModels(models);
        } else {
            setAvailableModels([]);
        }
        setSelectedModel('');
        setAvailableTrims([]);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const model = event.target.value;
        setSelectedModel(model);

        if (model && selectedMake && selectedYear) {
            const trims = Array.from(new Set(
                filterData
                    .filter(item => item.level3 === selectedYear && item.level1 === selectedMake && item.level2 === model)
                    .map(item => item.level4)
            ));
            setAvailableTrims(trims);
        } else {
            setAvailableTrims([]);
        }
    };

    const handleTrimChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const trim = event.target.value;
        setSelectedTrim(trim);
    }

    return (
        <div>
            {/* Year Dropdown */}
            <div className="mb-[12px] mt-[10px]">
                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">
                    1. | Select Year
                </label>
                <select 
                    id="search_rv_type654909998"
                    className="mt-[3px] h-[33px] w-full border-[2px] border-solid border-[red] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" 
                    value={selectedYear} 
                    onChange={handleYearChange}
                >
                    <option value="">Select Year</option>
                    {Array.from(new Set(filterData.map(item => item.level3)))
                        .map(year => (
                            <option key={year} value={year}>
                                {year}
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
                    id="search_rv_make654909998" 
                    className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" 
                    value={selectedMake} 
                    onChange={handleMakeChange} 
                    disabled={!availableMakes.length}
                >
                    <option value="">Select Make</option>
                    {availableMakes.map(make => (
                        <option key={make} value={make}>
                            {make}
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
                    id="search_rv_model654909998" 
                    className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" 
                    value={selectedModel} 
                    onChange={handleModelChange} 
                    disabled={!availableModels.length}
                >
                    <option value="">Select Model</option>
                    {availableModels.map(model => (
                        <option key={model} value={model}>
                            {model}
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
                    id="search_rv_trim654909998" 
                    className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" 
                    value={selectedTrim}
                    onChange={handleTrimChange}
                    disabled={!availableTrims.length}
                >
                    <option value="">Select Trim</option>
                    {availableTrims.map(trim => (
                        <option key={trim} value={trim}>
                            {trim}
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
