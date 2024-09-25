import PaymentMethods from '~/assets/payment-methods.webp'

export function Footer() {
    return (
        <footer className="bg-[#1f2024] text-[#999]">
            <div className="container">
                <div className="pt-[50px] lg:pt-[20px]">
                    <div className="grid grid-cols-2 gap-[10px] lg:grid-cols-4 lg:border-b-[1px] lg:border-solid lg:border-[#313135] lg:pb-[20px]">
                        <div className="flex flex-col items-center justify-center bg-[#292b2f] p-[20px] nw:flex-row nw:gap-[20px] lg:bg-transparent">
                            <span className="mb-[5px] font-['icon-dukamarket'] text-[#505050] before:text-[32px] before:leading-[1] before:content-['\e916']" aria-hidden="true"><span className="hidden">icon icon-tracking</span></span>
                            <div className="">
                                <h6 className="my-0 text-center text-[20px] uppercase text-white nw:text-left">Free Shipping</h6>
                                <p className="mb-0 text-center leading-6 nw:text-left">on all Orders</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#292b2f] p-[20px] nw:flex-row nw:gap-[20px] lg:bg-transparent">
                            <span className="mb-[5px] font-['icon-dukamarket'] text-[#505050] before:text-[32px] before:leading-[1] before:content-['\e915']" aria-hidden="true"><span className="hidden">icon icon-tracking</span></span>
                            <div className="">
                                <h6 className="my-0 text-center text-[20px] uppercase text-white nw:text-left">100% Secure</h6>
                                <p className="mb-0 text-center leading-6 nw:text-left">Buy With Confidence</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#292b2f] p-[20px] nw:flex-row nw:gap-[20px] lg:bg-transparent">
                            <span className="mb-[5px] font-['icon-dukamarket'] text-[#505050] before:text-[32px] before:leading-[1] before:content-['\e91b']" aria-hidden="true"><span className="hidden">icon icon-tracking</span></span>
                            <div className="">
                                <h6 className="my-0 text-center text-[20px] uppercase text-white nw:text-left">24/7 Customer Service</h6>
                                <p className="mb-0 text-center leading-6 nw:text-left">Phone, Chat or Email</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#292b2f] p-[20px] nw:flex-row nw:gap-[20px] lg:bg-transparent">
                            <span className="mb-[5px] font-['icon-dukamarket'] text-[#505050] before:text-[32px] before:leading-[1] before:content-['\e912']" aria-hidden="true"><span className="hidden">icon icon-tracking</span></span>
                            <div className="">
                                <h6 className="my-0 text-center text-[20px] uppercase text-white nw:text-left">30-Day Money-Back</h6>
                                <p className="mb-0 text-center leading-6 nw:text-left">Hassle-Free Return</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[30px] mt-[20px]">
                        <h4 className="mb-[20px] mt-[35px] text-center text-[24px] text-white">About CarCover.com</h4>
                        <div className="mx-auto w-[70%] text-center">
                            <p>
                            Experience matters, and with 25 years in the industry, CarCover.com has honed it's expertise to bring you the best products and services. Our low prices, five-star customer support and lifetime warranty means that you can trust us to protect your vehicle without breaking the bank. Count on CarCover.com to deliver quality and value you can rely on.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px] md:grid md:grid-cols-2 xl:grid-cols-4">
                        <div className="rv-collapse group bg-[#292b2f] px-[15px] py-[3px] md:bg-transparent lg:px-0">
                            <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex items-center justify-between py-[3px] text-[22px] font-medium uppercase text-white after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621'] md:after:content-none md:group-[.is-active]:after:content-none">RV COVERS</h4>
                            <ul className="mt-[8px] hidden group-[.is-active]:block md:block">
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/class-a-rv-covers" title="Class A RV covers">Class A RV covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/class-b-rv-covers" title="Class B RV covers">Class B RV covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/class-c-rv-covers" title="Class C RV covers">Class C RV covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/travel-trailer-covers" title="Travel Trailer Covers">Travel Trailer Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/fifth-wheel-trailer-covers" title="Fifth Wheel Trailer Covers">Fifth Wheel Trailer Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/folding-camper-trailer-covers" title="Folding Pop Up Camper Trailer Covers">Folding Pop Up Camper Trailer Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/truck-camper-covers" title="Truck Camper Covers">Truck Camper Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/teardrop-trailer-covers" title="Teardrop Covers">Teardrop Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/collections/rv-covers-accessories" title="RV Cover Accessories">RV Cover Accessories</a></li>
                            </ul>
                        </div>
                        <div className="rv-collapse group bg-[#292b2f] px-[15px] py-[3px] md:bg-transparent lg:px-0">
                            <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex items-center justify-between py-[3px] text-[22px] font-medium uppercase text-white after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621'] md:after:content-none md:group-[.is-active]:after:content-none">INSTALLATION GUIDE</h4>
                            <ul className="mt-[8px] hidden group-[.is-active]:block md:block">
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/installation" title="RV Installation Guide">RV Installation Guide</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/how-to-properly-measure-your-rv-for-a-storage-cover" title="How To Measure your RV">How To Measure your RV</a></li>
                            </ul>
                        </div>
                        <div className="rv-collapse group bg-[#292b2f] px-[15px] py-[3px] md:bg-transparent lg:px-0">
                            <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex items-center justify-between py-[3px] text-[22px] font-medium uppercase text-white after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621'] md:after:content-none md:group-[.is-active]:after:content-none">OUR COMPANY</h4>
                            <ul className="mt-[8px] hidden group-[.is-active]:block md:block">
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/about-us" title="About Us">About Us</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/faq" title="FAQ">FAQ</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/blogs/blog" title="Blog">Blog</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/compare-rv-covers" title="Compare RV Covers">Compare RV Covers</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/shipping-policy" title="Shipping Policy">Shipping Policy</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/cancellation-policy" title="Cancellation Policy">Cancellation Policy</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/return-policy-and-exchange" title="Return Policy">Return Policy</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/warranty-policy" title="Warranty Policy">Warranty Policy</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/privacy-policy" title="Privacy Policy">Privacy Policy</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/terms-and-conditions" title="Terms and Conditions">Terms and Conditions</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/contact" title="Contact Us">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="rv-collapse group bg-[#292b2f] px-[15px] py-[3px] md:bg-transparent lg:px-0">
                            <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex items-center justify-between py-[3px] text-[22px] font-medium uppercase text-white after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621'] md:after:content-none md:group-[.is-active]:after:content-none">WE GUARANTEE</h4>
                            <ul className="mt-[8px] hidden group-[.is-active]:block md:block">
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/price-protection-guarantee" title="Price Protection Guarantee">Price Protection Guarantee</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/perfect-fit-guarantee" title="Perfect-Fit Guarantee">Perfect-Fit Guarantee</a></li>
                                <li className="py-[5px]"><a className="font-heading text-[18px]" href="/pages/fast-shipping-guarantee" title="Fast Shipping Guarantee">Fast Shipping Guarantee</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-[20px] flex flex-col items-center justify-center py-[25px] md:border-t-[1px] md:border-solid md:border-[#313135]">
                        <div className='mb-[20px] mt-[20px]'><img src={PaymentMethods} /></div>
                        <div>
                            <span className="font-heading text-[14px]">
                                Copyright © 2024 CarCover.ca. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function toggleMenuItem(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.parentElement?.classList.toggle('is-active');
}