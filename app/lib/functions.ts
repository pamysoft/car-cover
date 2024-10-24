import { CategoryType } from "~/components/common/PageWrapper";
import { isPathwayInfo, LevelInfo, PathwayInfo, VehicalData } from "./types";

export function toTitleCase(str: string): string {
    if (!(str)) return str;
    return str
        .toLowerCase() // Convert the string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' ');    // Join the words back into a string
}


export const sendContact = async (proxyUrl: string, payload: FormData): ResponseResult => {
    let appProxyUrl = proxyUrl + `send-contact/?shop=1`;
    let errorMessage = ''

    try {
        const response = await fetch(appProxyUrl, {
            method: 'POST',
            body: payload,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('callproxyerror:', error.message);
            errorMessage = error.message
        } else {
            console.log('callproxyerror: An unknown error occurred');
            errorMessage = 'An unknown error occurred'
        }
    }

    return { success: false, message: errorMessage }
}


export const fetchMakeList = async (proxyUrl: string, year: string) => {
    const endpoint = `get-make-list/${encodeURIComponent(year)}/?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};

export const fetchSizeList = async (proxyUrl: string, type: string) => {
    const endpoint = `rvcovers-get-size-list/${encodeURIComponent(type)}/?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};

export const fetchModelList = async (proxyUrl: string, year: string, make: string) => {
    const endpoint = `get-model-list/${encodeURIComponent(year)}/${encodeURIComponent(make)}?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};

export const fetchTrimList = async (proxyUrl: string, year: string, make: string, model: string) => {
    const endpoint = `get-trim-list/${encodeURIComponent(year)}/${encodeURIComponent(make)}/${encodeURIComponent(model)}?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};


// Common fetch utility function
export const fetchData = async <T>(
    proxyUrl: string,
    endpoint: string,
    method: string = 'GET',
    headers: Record<string, string> = { 'Content-Type': 'application/json' }
): Promise<T | unknown> => {
    const appProxyUrl = proxyUrl + endpoint;

    try {
        const response = await fetch(appProxyUrl, {
            method,
            headers,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error('fetchData error:', error.message);
        } else {
            console.error('fetchData error: An unknown error occurred');
        }
        return null;
    }
};


export const fetchBreadcrumbs = async (proxyUrl: string, path: string) => {
    const endpoint = `get-breadcrumbs/${encodeURIComponent(path)}?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};

export const fetchRvcoverBreadcrumbs = async (proxyUrl: string, path: string) => {
    const endpoint = `rvcovers-get-breadcrumbs/${encodeURIComponent(path)}?shop=1`;
    return await fetchData(proxyUrl, endpoint);
};


export const fetchVehicleByPath = async (proxyUrl: string, path: string): Promise<VehicalData | null> => {
    const endpoint = `get-vehicle-by-path/${encodeURIComponent(path)}?shop=1`;

    const data = await fetchData(proxyUrl, endpoint);

    if (data) {
        return data as VehicalData;
    }

    return null;
};


export const fetchCarCoverHierarchy = async (proxyUrl: string, parentId?: number) => {
    let endpoint = `vehicle-hierarchy-by-parent-id/?shop=1`;

    if (parentId) {
        endpoint += `&parentId=${encodeURIComponent(parentId.toString())}`;
    }

    return await fetchData(proxyUrl, endpoint);
};

export const fetchCarCoverHierarchyByHandle = async (proxyUrl: string, path: string) => {
    let appProxyUrl = proxyUrl + `vehicle-hierarchy-by-path/?shop=1`;

    appProxyUrl = appProxyUrl + `&path=${path}`

    try {
        const response = await fetch(appProxyUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        if (Array.isArray(result)) {
            // Optionally check if the array contains items of type PathwayInfo
            if (result.every(item => isPathwayInfo(item))) {
                return result as PathwayInfo[];
            } else {
                return [];
            }
        } else {
            return [];
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('callproxyerror:', error.message);
        } else {
            console.log('callproxyerror: An unknown error occurred');
        }
    }

    return []
}

export const fetchCarCoverDataByPath = async (proxyUrl: string, path: string) => {
    let appProxyUrl = proxyUrl + `children-by-handle-path/?shop=1`;

    appProxyUrl = appProxyUrl + `&path=${path}`

    try {
        const response = await fetch(appProxyUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('callproxyerror:', error.message);
        } else {
            console.log('callproxyerror: An unknown error occurred');
        }
    }

    return null
}

export function isArrayOfStrings(variable: any): variable is string[] {
    return Array.isArray(variable) && variable.every(item => typeof item === 'string');
}

// Function to fetch Shopify products by path
export const fetchShopifyProductsByPath = async (
    proxyUrl: string,
    path: string
): Promise<string[]> => {
    const endpoint = `fetch-shopify-products-by-path/${encodeURIComponent(path)}`;
    const result = await fetchData<string[]>(proxyUrl, endpoint);

    return result && isArrayOfStrings(result) ? result : [];
};

// Function to fetch Shopify products by path
export const fetchRvcoverShopifyProductsByPath = async (
    proxyUrl: string,
    path: string
): Promise<string[]> => {
    const endpoint = `rvcovers-shopify-products-by-path/${encodeURIComponent(path)}?shop=1`;
    const result = await fetchData<string[]>(proxyUrl, endpoint);

    return result && isArrayOfStrings(result) ? result : [];
};

export function stripSlashes(text: string): string {
    return text.replace(/^\/+|\/+$/g, '');
}

// Function to check if a LevelInfo object is blank
export const isBlankLevelInfo = (levelInfo: LevelInfo): boolean => {
    return levelInfo?.id === '' && levelInfo?.handle === '' && levelInfo?.name === '';
};


export function getValidProducts(productsResponse) {
    const products = productsResponse['nodes'];
    const validProducts = []
    for (const product of products) {
        if (product) {
            const productSku = product.variants.nodes[0].sku
            product.sku = productSku
            product.tagline = getProductTagLine(productSku)
            product.shortDescription = getProductShortDescription(productSku)
            product.additional_html = getProductAdditionalHtml(productSku)

            product.trim = product.metafields[0]?.value
            product.quality = product.metafields[1]?.value
            product.imageurl = `https://cdn.shopify.com/s/files/1/0607/7064/8154/files/${product.trim}${product.quality}.jpg`

            validProducts.push(product)
        }
    }
    return validProducts
}

export function getProductShortDescription(productSku: string) {
    let productDescription = '';  // Default value for description

    // Check the start of the SKU and return appropriate description
    if (productSku.startsWith('5L')) {
        productDescription = `
      <p>Experience superior protection for your vehicle with our top-of-the-line Gold Shield 5L Car Cover.</p>
      <ul>
        <li>This five (5) layers car cover is expertly crafted to withstand all weather extremities, from desert heat to severe snow storms, ensuring your car is well-protected.</li>
        <li>Its standout feature is the 100% breathable, water-resistant material, which offers robust defense against the elements while maintaining the right balance of air circulation to keep your car in prime condition.</li>
        <li>The cover's inner layer is lined with a soft cotton fleece, thoughtfully designed to safeguard the paint and finish of your vehicle.</li>
        <li>We guarantee a perfect fit on your vehicle, or you will receive a full refund.</li>
        <li>Our commitment to quality is backed by our full <strong>Lifetime Warranty</strong>.</li>
        <li><u>Included with your purchase:</u> Free Shipping, Lifetime Warranty, Storage Bag, Cable and Lock, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('4BL')) {
        productDescription = `
      <p>Introducing the all new Black Satin Car Cover, the ultimate solution for indoor protection of your vehicle.</p>
      <ul>
        <li>The fine woven threads and silky smooth fabric with a glossy finish will preserve the finish and detailing of your car, keeping it looking showroom-new.</li>
        <li>The cover provides protection against dust, dirt, and scratches, ensuring your vehicle stays in pristine condition.</li>
        <li>The Black Satin Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a full <strong>Lifetime Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, Lifetime Warranty, Storage Bag, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('3L')) {
        productDescription = `
      <p>The Silver Shield 3L Car Cover is designed to offer top-notch protection whether you're storing your vehicle indoors or using it outdoors in typical weather conditions.</p>
      <ul>
        <li>Constructed with three (3) layers of materials, including a Micro-Porous film, this car cover not only securely envelops your vehicle but also allows it to breathe safely.</li>
        <li>This cover provides consistent and trustworthy protection for your car when it's left outdoors in standard weather conditions.</li>
        <li>The Silver Shield 3L Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a <strong>5-Year Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, 5-Year Warranty, Storage Bag, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('2L')) {
        productDescription = `
      <p>If you're looking for a car cover specifically made for indoor storage that is lightweight, then the Bronze Shield 2L Car Cover is the perfect choice.</p>
      <ul>
        <li>Crafted with two (2) layers of Polypropylene PLUS, this car cover is an ideal choice for basic indoor protection.</li>
        <li>The cover provides protection against dust, dirt, and scratches, ensuring your vehicle stays in pristine condition.</li>
        <li>The Bronze Shield 2L Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a <strong>3-Year Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, 3-Year Warranty, Storage Bag, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('5RV')) {
        productDescription = `
        <p>Experience superior protection for your RV with our top-of-the-line Gold Shield 5L RV Cover.</p>
        <ul>
            <li>This premium RV cover is expertly crafted to withstand extreme weather conditions, from desert heat to severe snowstorms, ensuring your RV is well-protected. It features a thick 5-ply fabric on the top and a 3-ply fabric on the sides, providing superior protection for your RV's paint and finish.</li>
            <li>Its standout feature is the 100% breathable, water-resistant material, which offers robust defense against the elements while maintaining the right balance of air circulation to keep your RV in prime condition.</li>
            <li>The Gold Shield 5L RV Cover is designed to accommodate up to three AC units on its roof, featuring zippered panels for convenient access at any time and, air vents.</li>
            <li>Our commitment to quality is backed by our full <strong>Lifetime Warranty</strong>.</li>
            <li><u>Included with your purchase:</u> Free Shipping, Lifetime Warranty, Storage Bag, Buckles and Straps (front, rear and bottom), Free Patch kit for quick repairs, rain gutter covers, a ladder cap, toss bag and much more!</li>
        </ul>
        <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('3RV')) {
        productDescription = `
        <p>The Silver Shield 3L RV Cover is a great alternative for storing your RV outdoors or indoors under mild weather conditions.</p>
        <ul>
            <li>This RV cover is water-resistant, breathable, scratch proof, dust repellent and offers protection against low
                winds along with calm rain.</li>
            <li>Its offers a thick 3-ply fabric on the top and a 2-ply fabric on the sides, making sure to protect your RV's
                paint and finish.</li>
            <li>The Silver Shield 3L RV Cover is designed to accommodate up to three AC units on its roof, featuring zippered
                panels for convenient access at any time and, air vents.</li>
            <li>We are so confident in the quality of our cover that we offer a <strong>5-Year Warranty</strong>, giving you
                peace of mind with your purchase.</li>
            <li><u>Included with your purchase:</u> Free Shipping, 5-Year Warranty, Storage Bag, Buckles and Straps (front, rear
                and bottom), Free Patch kit for quick repairs, rain gutter covers, a ladder cap, toss bag and much more!</li>
        </ul>
        <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
    } else if (productSku.startsWith('5FC')) {
        productDescription = `
        <p>When it comes to buying RV Covers, our Gold Shield 5L RV Cover beats all its competitors for many reasons; This RV cover can protect against all types of extreme weather conditions such as: snow storms, desert heat and even hail storms since the cover is 100% water-resistant. The Ultimate RV Cover exclusively offers a thick 5-ply fabric on the top and a 3-ply fabric on the sides, making sure to protect your RV's paint and finish. The Gold Shield 5L RV Cover includes straps and buckles, free storage bag, a free patch kit for quick repairs and much more! Plus, we will ship it to you free of charge. We also back this cover up with our full Lifetime Warranty. This RV Cover is guaranteed to fit perfectly or your money back. Order now and take advantage of our limited-time great pricing!</p>
    `;
    } else if (productSku.startsWith('3FC')) {
        productDescription = `
        <p>The Silver Shield 3L RV Cover is a great alternative for storing your RV indoors or outdoors under mild weather conditions. This RV cover is water-resistant, breathable, scratch proof, dust repellent and offers protection against low winds along with calm rain. The RV Cover offers a thick 3-ply fabric on the top and a 2-ply fabric on the sides, making sure to protect your RV's paint and finish. The Silver Shield 3L RV Cover includes straps and buckles, free storage bag, a free patch kit for quick repairs and much more! Plus, we will ship it to you free of charge. We also back this cover up with our full Lifetime Warranty. This RV Cover is guaranteed to fit perfectly or your money back. Order now and take advantage of our limited-time great pricing!</p>
    `;
    }

    return productDescription;  // Return the product description based on SKU
}


export function getProductTagLine(productSku: string) {
    let productTagline = '';  // Default value for tagline

    // Check the start of the SKU and assign appropriate tagline
    if (productSku.startsWith('5L')) {
        productTagline = '100% Water-Resistant Fabric with Super Soft Inner Lining';
    } else if (productSku.startsWith('4BL')) {
        productTagline = 'Satin Fabric for Indoor Use Only';
    } else if (productSku.startsWith('3L')) {
        productTagline = 'All-Weather Outdoor Protection for Everyday Use';
    } else if (productSku.startsWith('2L')) {
        productTagline = 'Made for Indoor Use Only';
    } else if (productSku.startsWith('5RV') || productSku.startsWith('5FC')) { // RV Covers
        productTagline = '100% Water-Resistant Fabric for Extreme Weather Conditions';
    } else if (productSku.startsWith('3RV') || productSku.startsWith('3FC')) {
        productTagline = 'All-Weather Protection'
    }


    return productTagline;  // Return the tagline for the given SKU
}

export function getProductAdditionalHtml(productSku: string) {
    let html = '';  // Default value for tagline

    // Check the start of the SKU and assign appropriate tagline
    if (productSku.startsWith('5RV') || productSku.startsWith('5FC')) {
        html = `
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">Free</span> Shipping
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">In</span> Stock
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">Lifetime</span> Warranty
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            Ships <span class="text-[red]">Same</span> Business Day
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            Financing Available
        </div>
        `;
     } else if (productSku.startsWith('3RV') || productSku.startsWith('3FC')) {
        html = `
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">Free</span> Shipping
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">In</span> Stock
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">5-Year</span> Warranty
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            Ships <span class="text-[red]">Same</span> Business Day
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            Financing Available
        </div>
        `;
    } else {
        html = `
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">Free</span> Shipping
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">In</span> Stock
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            <span class="text-[red]">Lifetime</span> Warranty
        </div>
        <div class="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
            Ships <span class="text-[red]">Same</span> Business Day
        </div>
        `;
    }

    return html;  // Return the tagline for the given SKU
}


export function getSortedProducts(products) {
    return products.sort((a, b) => {
        // Compare SKUs in descending order
        if (a.sku > b.sku) return -1;
        if (a.sku < b.sku) return 1;
        return 0;
    });
}

export function detectCategory(pathname: string) {
    const parts = stripSlashes(pathname).split('/')
    if (parts.length > 0) {
      const slug = parts[0]
      switch (slug) {
        case 'car-covers':
          if (parts.length > 1) {
            return CategoryType.CarCoversChildren
          } else {
            return CategoryType.CarCovers
          }
        case 'rv-covers':
          if (parts.length > 1) {
            return CategoryType.RvCoversChildren
          } else {
            return CategoryType.RvCovers
          }
      }
    }
    return CategoryType.CarCovers
  }