import { Money } from '@shopify/hydrogen';
import type { MoneyV2 } from '@shopify/hydrogen/storefront-api-types';

export function LoopProductPrice({
    price,
    compareAtPrice,
}: {
    price?: MoneyV2;
    compareAtPrice?: MoneyV2 | null;
}) {
    const priceAmount = price ? parseFloat(price.amount) : 0;
    const compareAtPriceAmount = compareAtPrice ? parseFloat(compareAtPrice.amount) : 0;
    const savings = compareAtPriceAmount - priceAmount;
    const savingsPercentage = compareAtPriceAmount > 0 ? (savings / compareAtPriceAmount) * 100 : 0;

    return (
        <>
            {compareAtPrice ? (
                <>
                    <div className="mb-[15px] text-[30px] font-medium text-[#ff0000]">
                        {price ? <Money data={price} /> : null}
                    </div>
                    <div>
                        Regular Price: <span className="text-[18px] font-semibold text-black"><Money data={compareAtPrice} /></span>
                    </div>
                    <div className="mt-[7px]">
                        {price ? (
                            <>
                                You save <span className="text-[18px] font-semibold text-black">${savings.toFixed(2)}</span>
                                <span className="text-[#ff0000]"> ({savingsPercentage.toFixed(0)}% Off)</span>
                            </>
                        ) : null}
                    </div>
                </>
            ) : (
                price ? (
                    <div className="mb-[15px] text-[30px] font-medium text-[#ff0000]">
                        <Money data={price} />
                    </div>
                ) : (
                    <span>&nbsp;</span>
                )
            )}
        </>
    );
}
