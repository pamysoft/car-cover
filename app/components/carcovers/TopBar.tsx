export function TopBar() {
    return <div>
        <div className="hidden bg-[#252525] py-[13px] font-[Oswald] text-white md:block">
            <ul className="flex justify-center">
                <li className="border-r-solid border-r-[1px] border-r-[#ffffff26] px-[20px] py-[0px] leading-[1]"><a title="My Account" href="/account">My account</a></li>
                <li className="border-r-solid border-r-[1px] border-r-[#ffffff26] px-[20px] py-[0px] leading-[1]"><a title="FAQs" href="/pages/faq">FAQs</a></li>
                <li className="border-r-solid border-r-[1px] border-r-[#ffffff26] px-[20px] py-[0px] leading-[1]"><a title="Checkout" href="/checkout">Checkout</a></li>
                <li className="border-r-solid border-r-[1px] border-r-[#ffffff26] px-[20px] py-[0px] leading-[1]">

                    <a title="Login" href="/account/login">Login</a>

                </li>
                <li className="px-[20px] py-[0px] leading-[1]"><a title="Contact Us" href="/pages/contact">Contact Us</a></li>
            </ul>
        </div>

    </div>
}