export type CollectionInfo = {
    id: string;
    title: string;

    level_1?: string;
    level_2?: string;
    level_3?: string;
    level_4?: string;
    level_5?: string;

    level_1_url?: string;
    level_2_url?: string;
    level_3_url?: string;
    level_4_url?: string;
    level_5_url?: string;
}

export type LevelInfo = {
    id: string
    handle: string;
    name: string;
}

export type PathwayInfo = {
    handle: string;
    name: string;
}

export function isPathwayInfo(item: any): item is PathwayInfo {
    return typeof item === 'object' && 
           typeof item.handle === 'string' && 
           typeof item.name === 'string';
}

export type VehicalData = {
    makeHandle: string;
    makeTitle: string;
    modelHandle?: string;
    modelTitle?: string;
    year?: string;
    trimHandle?: string;
    trimTitle?: string;
    level: number;
    urlPath: string;
}