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

export const blankLevelInfo: LevelInfo = {
    id: '',
    handle: '',
    name: ''
};

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


export type ResponseResult = {
    success: Boolean;
    message: string;
}

export enum DisplayLayout {
    ListProducts = 0,
    StaticContent = 1
}


// type for page setting data
export enum BlockType {
    Text = 'text',
    HTML = 'html',
    Other = 'other'
}

export type AllBlockTypes = TextBlockType | OtherBlockType | HtmlBlockType

export interface Block {
    id: string;
    content: AllBlockTypes;
    order: number;
    type: BlockType;
}

export interface TextBlockType {
    title: string;
    text: string;
}
export interface HtmlBlockType {
    html: string;
}
export interface OtherBlockType {
    data: string;
}

export interface PageSettingsData {
    bannerImage: string;
}