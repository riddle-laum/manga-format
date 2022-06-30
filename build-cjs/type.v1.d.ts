declare namespace Manga {
    type Manga = {
        id: string;
        title: string | null;
        yomi?: string;
        pages: string[];
        author: Author;
        series: Series;
        tags: Tag[];
    };
    type Author = {
        name: string;
        yomi: string;
        twitter: string;
        pixiv: string;
        homepage: string;
    };
    type Series = {
        id: string;
        name: string;
        length: number;
        number: number;
        next: string;
        prev: string;
    };
    type Tag = {
        id: string;
        name: string;
    };
}
export default Manga;
