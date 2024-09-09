export function HeaderInfo() {
    return (
        <div className="w-full font-heading text-[17px] tracking-tight text-black lg:flex">
            <div className="ml-[70px] flex w-full items-center">
                <div className="grid w-full grid-cols-3 justify-center">
                    <div className="flex">
                        <div className="flex gap-[15px]">
                            <i className="fa fa-phone text-[20px]"></i>
                            <div className="">
                                <div className="">Call Us Now <span className="text-[red]">1-800-770-1838</span>
                                </div>
                                <div className="mt-[5px]">Order Online or by Phone 24/7</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex gap-[15px]">
                            <i className="fa fa-clock text-[20px]"></i>
                            <div className="">
                                <div className="">
                                    <span className="text-[red]">FREE SHIPPING</span> to Canada</div>
                                <div className="mt-[5px]">Ships from Canada</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex gap-[15px]">
                            <i className="fa fa-check-circle text-[20px]"></i>
                            <div className="">
                                <div className="">All Prices are in <span className="text-[red]">CAD</span>
                                </div>
                                <div className="mt-[5px]">Lifetime Warranty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}