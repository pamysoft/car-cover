import { toTitleCase } from '~/lib/functions';
import { CarCoverComparison } from './CarCoverComparison';
import { CarCoverTypes } from './CarCoverTypes';
import { HeroSection } from './HeroSection';
import { SearchBox } from './SearchBox';
import { Slideshow } from './Slideshow';
import { ValueProposition } from './ValuePropostion';

export function CategoryStaticContent({theFilter}) {
    let parts: string[] = [];

    parts.push(toTitleCase(theFilter.make));
    if (theFilter.model) {
        parts.push(toTitleCase(theFilter.model));
        if (theFilter.year) {
            parts.push(toTitleCase(theFilter.year));
        }
    }
    let dynamicText: String = parts.join(' ')
    return <>
        <div className='container mt-[20px] lg:mt-0'>
            <div className='md:gap-0 ml:flex'>
                <SearchBox className="ml:w-1/4" />
                <Slideshow className="mt-[30px] ml:mt-0 ml:w-3/4 ml:pl-[15px]" />
            </div>
        </div>
        <StaticContent dynamicText={dynamicText} />
        <ValueProposition />
        <CarCoverTypes />
        <CarCoverComparison />
    </>
}

function StaticContent({ dynamicText }) {
    return <>
        <div className="container">
            <h1 className="mb-[20px] mt-[22px] text-[30px] font-medium">{dynamicText} Car Covers</h1>
            <div className="">
                <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium leading-[1.2]">Buy the Best {dynamicText} Car Cover</h2>
                <p>
                    At CarCover.com, buying a custom car cover is made easy. With a selection of over one hundred thousand outdoor, indoor, and waterproof covers, we're confident you'll find the cover for your needs. Whether you are looking for a custom fit cover, or an universal one, we have the vehicle cover you are looking, and at the best price. Browse our collection today and have your car cover shipped to you hassle-free.
                </p>
                <p>
                    For a limited time only, take advantage of our special offer: enjoy up to 60% off and free expedited shipping on all orders placed with CarCover.com. Additionally, every purchase of our top-of-the-line custom car covers comes with a lifetime warranty, providing you with peace of mind and assurance in the quality of our products. Don't miss out on this deal to protect your {dynamicText} with a high-quality vehicle cover. Shop now!
                </p>

                <h2 className="mb-[20px] mt-[20px] text-[28px] font-medium">Why You Need a {dynamicText} Car Cover</h2>
                <p>Whether you're looking for custom covers that protect your beloved classic car outdoors or superior protection for your sportscar in your garage, CarCover.com is the internet's premium choice for outstanding car covers.</p>
                <p>
                    A car cover is essential for protecting your vehicle, whether you park it outdoors or indoors. It shields your car from various environmental hazards, including damaging UV rays that can fade paint and deteriorate the interior. Weatherproof covers are particularly beneficial, as they guard against rain, snow, and bird droppings, preventing rust and stains. Dust and debris are kept at bay, preserving the car's finish and reducing the need for frequent washes. Additionally, using a car cover helps maintain your car's resale value by keeping it in pristine condition. Furthermore, a car cover acts as a deterrent to theft and vandalism by keeping your vehicle out of sight when parked outdoor. Overall, investing in a car cover ensures your car's appearance and longevity.
                </p>
            </div>
        </div>

    </>
}