import { GET_COLLECTIONS_QUERY } from "./fragments";
import { CollectionInfo, LevelInfo } from "./types";

export function toTitleCase(str: string): string {
    if (!(str)) return str;
    return str
        .toLowerCase() // Convert the string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' ');    // Join the words back into a string
}


// Corrected loadCollections function
export const loadCollections = async (storefront: any, allCollections: CollectionInfo[], after?: string): Promise<void> => {
    
    // Adjust the query to possibly include 'after'
    const result = await storefront.query(GET_COLLECTIONS_QUERY, {
        variables: {
            after: after || null,
        },
        // cache: storefront.CacheLong()
    });

    // Iterate over the result and build CollectionInfo objects
    for (const collection of result.collections.edges) {
        let info: CollectionInfo = {
            id: collection.node.id,
            title: collection.node.title,
        };

        if (collection.node.metafields[0]) {
            info.level_1 = collection.node.metafields[0].value
        }
        if (collection.node.metafields[1]) {
            info.level_1_url = collection.node.metafields[1].value
        }
        if (collection.node.metafields[2]) {
            info.level_2 = collection.node.metafields[2].value
        }
        if (collection.node.metafields[3]) {
            info.level_2_url = collection.node.metafields[3].value
        }
        if (collection.node.metafields[4]) {
            info.level_3 = collection.node.metafields[4].value
        }
        if (collection.node.metafields[5]) {
            if (!info.level_3) {
                info.level_3 = collection.node.metafields[5].value
            }
            info.level_3_url = collection.node.metafields[5].value
        }
        if (collection.node.metafields[6]) {
            info.level_4 = collection.node.metafields[6].value
        }
        if (collection.node.metafields[7]) {
            info.level_4_url = collection.node.metafields[7].value
        }
        if (collection.node.metafields[8]) {
            info.level_5 = collection.node.metafields[8].value
        }
        if (collection.node.metafields[9]) {
            info.level_5_url = collection.node.metafields[9].value
        }

        // Push each collection info object to the allCollections array
        allCollections.push(info);
    }

    if (result.collections.pageInfo.hasNextPage) {
        const nextAfter: string = result.collections.edges[result.collections.edges.length - 1].cursor;
        await loadCollections(storefront, allCollections, nextAfter)
    }
};

export function getYears(collections: CollectionInfo[]): LevelInfo[] {
    let years: LevelInfo[] = [];
    for (const info of collections) {
        if (info.level_3 && info.level_3_url) {
            const item: LevelInfo = {
                title: info.level_3,
                handle: info.level_3_url,
            };

            // Check if item already exists
            if (!years.some(year => year.handle.toLowerCase() === item.handle.toLowerCase())) {
                years.push(item);
            }
        }
    }

    // Sort years in descending order based on the numeric value of 'handle'
    years.sort((a, b) => {
        const yearA = parseInt(a.handle, 10);
        const yearB = parseInt(b.handle, 10);
        return yearB - yearA; // For descending order
    });

    return years;
}

export function getMakes(collections: CollectionInfo[], year: string): LevelInfo[] {
    let makes: LevelInfo[] = [];
    for (const info of collections) {
        if (info.level_3_url === year && info.level_1 && info.level_1_url) {
            const make: LevelInfo = {
                title: info.level_1,
                handle: info.level_1_url,
            };

            // Check if make already exists
            if (!makes.some(m => m.handle.toLowerCase() === make.handle.toLowerCase())) {
                makes.push(make);
            }
        }
    }

    // Sort makes by title in ascending order
    makes.sort((a, b) => a.title.localeCompare(b.title));

    return makes;
}


export function getModels(collections: CollectionInfo[], year: string, make: string): LevelInfo[] {
    let models: LevelInfo[] = [];
    for (const info of collections) {
        if (info.level_1_url === make && info.level_3_url === year && info.level_2 && info.level_2_url) {
            const model = {
                title: info.level_2,
                handle: info.level_2_url,
            };

            // Check if model already exists
            if (!models.some(m => m.handle.toLowerCase() === model.handle.toLowerCase())) {
                models.push(model);
            }
        }
    }
    models.sort((a, b) => a.title.localeCompare(b.title));
    return models;
}

export function getTrims(collections: CollectionInfo[], year: string, make: string, model: string): LevelInfo[] {
    let trims: LevelInfo[] = [];
    for (const info of collections) {
        if (info.level_1_url === make && info.level_2_url === model && info.level_3_url === year && info.level_4 && info.level_4_url) {
            const trim = {
                title: info.level_4,
                handle: info.level_4_url,
            };

            // Check if model already exists
            if (!trims.some(t => t.handle.toLowerCase() === trim.handle.toLowerCase())) {
                trims.push(trim);
            }
        }
    }
    trims.sort((a, b) => a.title.localeCompare(b.title));
    return trims;
}