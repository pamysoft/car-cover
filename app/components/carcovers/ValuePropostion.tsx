import daysMoneyBackGuarantee from '~/assets/features/30-days-money-back-guarantee.webp';
import fastAndFreeShipping from '~/assets/features/fast-and-free-shipping.webp';
import lifetimeWarranty from '~/assets/features/lifetime-warranty.webp';
import perfectFitGuarantee from '~/assets/features/perfect-fit-guarantee.webp';
import priceProtectionGuarantee from '~/assets/features/price-protection-guarantee.webp';
import remarkableCustomerService from '~/assets/features/remarkable-customer-service.webp';

const features = [
    {
        title: 'Free and Fast Shipping',
        desc: 'Not only shipping is always free, but it is extremely fast. Most of our orders are delivered within 3 business days.',
        image: fastAndFreeShipping
    },
    {
        title: 'Price Protection Guarantee',
        desc: 'It is simple! If you find a similar car cover cheaper elsewhere, we will match the price with an extra 10% discount.',
        image: daysMoneyBackGuarantee
    },
    {
        title: 'Perfect Fit Guarantee',
        desc: 'With over 25 years in the industry, all our car covers fit each and every vehicle perfectly and that\'s our guarantee.',
        image: perfectFitGuarantee
    },
    {
        title: 'Lifetime Warranty',
        desc: 'We offer unbeatable quality and durability, which is why we offer a lifetime warranty on our top-of-the-line car covers.',
        image: lifetimeWarranty
    },
    {
        title: '30-Day Money Back Guarantee',
        desc: 'We strongly believe in hassle-free returns. We give you 30 days to try out the car cover to assure complete customer satisfaction.',
        image: daysMoneyBackGuarantee
    },
    {
        title: 'Remarkable Customer Service',
        desc: 'Our dedicated team of experts are always ready to help! You can contact us via email, live chat, or phone every day of the week.',
        image: remarkableCustomerService
    },
]

export function ValueProposition() {
    return (
        <div>
            <div className="container">
                <h2 className="mb-[20px] mt-10 text-[28px] font-medium">CarCover.com True Difference</h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
                    {features.map(feature => <div className="flex flex-col items-center justify-center border-[1px] border-dotted border-[#c2c2c2] p-[20px]">
                        <div className="tracking-[-0.5px]">
                            <h6 className="mb-[25px] mt-[20px] text-center text-[20px] font-medium">{feature.title}</h6>
                            <div className="mb-[5px] flex justify-center">
                                <img src={feature.image} width="auto" height="auto" />
                            </div>
                            <p className="text-center">{feature.desc}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}