
namespace Manga{

  /**
   * information format
   */
  export type Manga = {

    /**
     * [ MUST ]
     * id (replace "=" in base64 with "z")
     */
    id: string;

    /**
     * [ SHOULD ]
     * title
     */
    title: string | null;

    /**
     * [ OPTIONAL ]
     * reading of title (small letter / hiragana only)
     */
    yomi?: string;

    /**
     * [ MUST ]
     * list of image file name of pages
     */
    pages: string[];

    /**
     * [ OPTIONAL ]
     * information of author
     */
    author: Author;

    /**
     * [ OPTIONAL ]
     * information of series
     */
    series: Series;

    /**
     * [ OPTIONAL ]
     * tags
     */
    tags: Tag[];
  };

  export type Author = {

    /**
     * name
     */
    name: string;

    /**
     * reading of name (small letter / hiragana only)
     */
    yomi: string;

    /**
     * teitter url
     */
    twitter: string;

    /**
     * pixiv url
     */
    pixiv: string;

    /**
     * homepage url
     */
    homepage: string;
  };

  export type Series = {

    /**
     * id
     */
    id: string;

    /**
     * name
     */
    name: string;

    /**
     * count of mangas
     */
    length: number;

    /**
     * n-th manga in series
     */
    number: number;

    /**
     * id of next manga in series
     */
    next: string;

    /**
     * id of previous manga in series
     */
    prev: string;
  };

  export type Tag = {

    /**
     * id
     */
    id: string;

    /**
     * name
     */
    name: string;
  }

};

export default Manga;
