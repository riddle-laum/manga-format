// ----- manga format version 2 -----

/**
 * manga information format
 */
export type Manga = {
  /**
   * [ NEED ]
   * version of information format
   */
  version: 2;

  /**
   * [ NEED ]
   * id
   */
  id: string;

  /**
   * [ WANT ]
   * title
   */
  title?: string;

  /**
   * [ WANT ]
   * reading of title
   */
  reading?: string;

  /**
   * [ NEED ]
   * list of image file name of pages
   */
  pages: string[];

  /**
   * [ WANT ]
   * author information
   */
  author?: Author[];

  /**
   * [ MAY ]
   * series information
   */
  series?: Series;

  /**
   * [ WANT ]
   * tags
   */
  tags?: Tag[];
};

/**
 * author information format
 */
export type Author = {

  /**
   * [ NEED ]
   * version
   */
  version: 2;

  /**
   * [ NEED ]
   * id
   */
  id: string;

  /**
   * [ WANT ]
   * name
   */
  name?: string;

  /**
   * [ MAY ]
   * reading of name
   */
  reading?: string;

  /**
   * [ MAY ]
   * reference sites
   */
  link?: {

    /**
     * [ MAY ]
     * twitter id
     */
    twitter?: string;

    /**
     * [ MAY ]
     * pixiv id
     */
    pixiv?: string;

    /**
     * [ MAY ]
     * other links
     * { "page name" => "page url" }
     */
    other?: Map<string, string>;
  };
};

/**
 * series information format
 */
export type Series = {

  /**
   * [ NEED ]
   * version
   */
  version: 2;

  /**
   * [ NEED ]
   * id
   */
  id: string;

  /**
   * [ NEED ]
   * name
   */
  name: string;

  /**
   * [ WANT ]
   * reading of name
   */
  reading?: string;

  /**
   * [ NEED ]
   * list of manga ids in sereis
   */
  mangas: string[];
};

export type Tag = {

  /**
   * [ NEED ]
   * version
   */
  version: 2;

  /**
   * [ NEED ]
   * id
   */
  id: string;

  /**
   * [ NEED ]
   * name
   */
  name: string;

  /**
   * [ WANT ]
   * reading of name
   */
  reading?: string;
};
