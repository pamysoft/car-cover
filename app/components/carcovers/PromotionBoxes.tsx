export function PromotionBoxes() {
    return (
        <div className="bg-[#252525]">
            <div className="container">
                <div className="page-width">
                    <div className="grid grid-cols-1 gap-[5px] py-[8px] font-heading md:grid-cols-3 md:gap-[30px]">
                        <div className="border-[3px] border-solid border-[red]">
                            <span className="flex justify-center py-[14px] text-center text-[18px] text-[white]">Canada Day Sale Starts Now!</span>
                        </div>
                        <div className="border-[3px] border-solid border-[red]">
                            <span className="flex justify-center py-[14px] text-center text-[18px] text-[white]">60% Off on all RV Covers</span>
                        </div>
                        <div className="hidden border-[3px] border-solid border-[red] sm:block">
                            <span className="flex justify-center py-[14px] text-center text-[18px] text-[white]">Biggest Sale of the Year!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}