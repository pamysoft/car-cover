import { isPathwayInfo, PathwayInfo } from "./types";

export function toTitleCase(str: string): string {
    if (!(str)) return str;
    return str
        .toLowerCase() // Convert the string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' ');    // Join the words back into a string
}


// const PROXY_URL = 'https://car-cover-app-575e2d27ff99.herokuapp.com/proxy/'
// const PROXY_URL = 'http://localhost:63038/proxy/'
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

    } catch (err) {
        console.log('callproxyerror:', err.message);
    } finally {
        console.log('callproxydone');
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

    } catch (err) {
        console.log('callproxyerror:', err.message);
    } finally {
        console.log('callproxydone');
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

    } catch (err) {
        console.log('callproxyerror:', err.message);
    } finally {
        console.log('callproxydone');
    }
    return null
}

export function removeSlashes(text: string): string {
    return text.replace(/^\/+|\/+$/g, '');
}