function RatingRow({ label, yesCount, noCount }) {
    return (
        <div className="mt-[2px] flex items-center gap-x-[5px]">
            <span className="inline-block w-[95px] font-[Oswald] text-[16px] font-semibold tracking-tight">{label}</span>
            {[...Array(yesCount)].map((_, i) => (
                <span key={`yes-${i}`} className="yes inline-block h-[12px] w-[13px] rounded-[3px] bg-[#ee3d43]"></span>
            ))}
            {[...Array(noCount)].map((_, i) => (
                <span key={`no-${i}`} className="no inline-block h-[12px] w-[13px] rounded-[3px] bg-[#a6a6a6]"></span>
            ))}
        </div>
    );
}

const getProductRatings = (productSku) => {
    let ratings = {};

    if (productSku.startsWith("5L")) {
        ratings = {
            "Outdoor": 5,
            "Indoor": 5,
            "Water": 5,
            "Cover Fit": 5,
            "Snow/Ice": 5,
            "Sun/UV Rays": 5,
            "Dirt/Dust": 5,
            "Thickness": 5,
        };
    } else if (productSku.startsWith("4BL")) {
        ratings = {
            "Indoor": 5,
            "Cover Fit": 5,
            "Dust": 5,
            "Durability": 5,
            "Softness": 5,
            "Dirt": 5,
        };
    } else if (productSku.startsWith("3L")) {
        ratings = {
            "Outdoor": 3.5,
            "Indoor": 5,
            "Water": 3.5,
            "Cover Fit": 5,
            "Snow/Ice": 3.5,
            "Sun/UV Rays": 4,
            "Dirt/Dust": 5,
            "Thickness": 3.5,
        };
    } else if (productSku.startsWith("2L")) {
        ratings = {
            "Outdoor": 2,
            "Indoor": 5,
            "Water": 2,
            "Cover Fit": 4,
            "Snow/Ice": 2,
            "Sun/UV Rays": 3,
            "Dirt/Dust": 5,
            "Thickness": 2,
        };
    } else if (productSku.startsWith("5RV") || productSku.startsWith("5FC")) {
        ratings = {
            "Outdoor": 5,
            "Indoor": 5,
            "Water": 5,
            "Breathability": 5,
            "Snow/Ice": 5,
            "Sun/UV Rays": 5,
            "Winter": 5,
            "Summer": 5,
        };
    } else if (productSku.startsWith("3RV") || productSku.startsWith("3FC")) {
        ratings = {
            "Outdoor": 4,
            "Indoor": 5,
            "Water": 4,
            "Breathability": 5,
            "Snow/Ice": 4,
            "Sun/UV Rays": 4,
            "Winter": 4,
            "Summer": 4,
        };
    }

    return ratings;
};

export function ProductInfoBottom({ productSku }) {
    const productRatings = getProductRatings(productSku);

    const ratings = Object.keys(productRatings).map((label) => {
        const yesCount = Math.floor(productRatings[label])*2;
        const noCount = 10 - yesCount;
        return { label, yesCount, noCount };
    });

    return (
        <div className="flex justify-center">
            <div className="mb-[10px] mt-[20px] grid grid-cols-1 flex-col items-center justify-center gap-x-[40px] sm:grid-cols-2">
                {ratings.map((rating, index) => (
                    <RatingRow
                        key={index}
                        label={rating.label}
                        yesCount={rating.yesCount}
                        noCount={rating.noCount}
                    />
                ))}
            </div>
        </div>
    );
}
