export declare type Manga = {
    version: 2;
    id: string;
    title?: string;
    reading?: string;
    pages: string[];
    author?: Author[];
    series?: Series;
    tags?: Tag[];
};
export declare type Author = {
    version: 2;
    id: string;
    name?: string;
    reading?: string;
    link?: {
        twitter?: string;
        pixiv?: string;
        other?: {
            [name: string]: string;
        };
    };
};
export declare type Series = {
    version: 2;
    id: string;
    name: string;
    reading?: string;
    mangas: string[];
};
export declare type Tag = {
    version: 2;
    id: string;
    name: string;
    reading?: string;
};
