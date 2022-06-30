import { Manga, Author, Series, Tag } from './type.v2.mjs';
export declare function isManga(target: {
    [key: string]: any;
}): target is Manga;
export declare function isAuthor(target: {
    [key: string]: any;
}): target is Author;
export declare function isSeries(target: {
    [key: string]: any;
}): target is Series;
export declare function isTag(target: {
    [key: string]: any;
}): target is Tag;
