import { isPathwayInfo, PathwayInfo } from "./types";

export function toTitleCase(str: string): string {
    if (!(str)) return str;
    return str
        .toLowerCase() // Convert the string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' ');    // Join the words back into a string
}


export const fetchCarCoverHierarchy = async (proxyUrl: string, parentId?: number) => {
    let appProxyUrl = proxyUrl + `vehicle-hierarchy-by-parent-id/?shop=1`;

    if (parentId) {
        appProxyUrl = appProxyUrl + `&parentId=${parentId}`
    }

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

    return []
}

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

function isArrayOfStrings(variable: any): variable is string[] {
    return Array.isArray(variable) && variable.every(item => typeof item === 'string');
}

export const fetchShopifyProductsByPath = async (proxyUrl: string, path: string): Promise<string[]> => {
    let appProxyUrl = proxyUrl + `shopify-products-by-path/?shop=1`;

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
        if (isArrayOfStrings(result)) {
            return result
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

export function stripSlashes(text: string): string {
    return text.replace(/^\/+|\/+$/g, '');
}