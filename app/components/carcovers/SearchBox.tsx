export function SearchBox(props: React.FC<{className: string}>) {
    return (
        <div className={props.className}>
            <form className="h-full max-w-none" method="post">
                <div className="h-full border-[1px] border-solid border-[#333] p-[10px]">
                    <div className="flex h-full flex-col justify-between gap-[35px]">
                        <div>
                            <div className="flex h-[35px] items-center justify-center bg-[#ff0000] p-[3px] text-center font-[Oswald] text-[18px] text-[#ffffff]">
                                VEHICLE COVER SEARCH
                            </div>
                            <div className="mb-[12px] mt-[10px]">
                                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">1. | Select Year</label>
                                <select id="search_rv_type654909998" className="mt-[3px] h-[33px] w-full border-[2px] border-solid border-[red] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]">
                                    <option value="">Select Year</option>
                                    <option value="class-a-rv-covers">1997</option>
                                    <option value="class-b-rv-covers">2021</option>
                                </select>
                            </div>
                            <div className="mb-[12px] mt-[10px]">
                                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">2. | Select Make</label>
                                <select id="search_rv_size654909998" className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" disabled=""><option value="">Select Size</option></select>
                            </div>
                            <div className="mb-[12px] mt-[10px]">
                                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">3. | Select Model</label>
                                <select id="search_rv_size654909998" className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" disabled=""><option value="">Select Size</option></select>
                            </div>
                            <div>
                                <label className="block font-[Oswald] text-[14px] tracking-tight text-[#222] ml:hidden">4. | Select Trim</label>
                                <select id="search_rv_size654909998" className="mt-[3px] h-[33px] w-full border-[1px] border-[#ccc] bg-white px-[12px] pb-[4px] pt-[6px] font-[Rubik] text-[13px] text-[#666] xl:h-[41px] 2xl:h-[45px]" disabled=""><option value="">Select Size</option></select>
                            </div>
                        </div>
                        <div className="flex justify-between ml:mt-0">
                            <button type="reset" className="bg-[#505050] px-[25px] py-[6px] font-[Rubik] text-[13px] font-medium text-white">
                                RESET
                            </button>
                            <button type="button" id="find_button654909998" className="bg-[#505050] px-[25px] py-[6px] font-[Rubik] text-[13px] font-medium text-white" disabled="">
                                FIND
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}