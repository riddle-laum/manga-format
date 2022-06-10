namespace v2{

  type TypeofReturnTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

  /**
   * information format
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
    title: string;

    /**
     * [ WANT ]
     * reading of title
     */
    reading: string;

    /**
     * [ NEED ]
     * list of image file name of pages
     */
    pages: string[];

    /**
     * [ WANT ]
     * author information
     */
    author: Author[];

    /**
     * [ MAY ]
     * series information
     */
    series: Series;

    /**
     * [ WANT ]
     * tags
     */
    tags: Tag[];
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
    name: string;

    /**
     * [ MAY ]
     * reading of name
     */
    reading: string;

    /**
     * [ MAY ]
     * reference sites
     */
    link: {

      /**
       * [ MAY ]
       * twitter id
       */
      twitter: string;

      /**
       * [ MAY ]
       * pixiv id
       */
      pixiv: string;

      /**
       * [ MAY ]
       * other links
       * { "page name" => "page url" }
       */
      other: Map<string, string>;
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
     * [ WANT ]
     * name
     */
    name: string;

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
  };

  export function checkManga(data: any): data is Manga{
    
    // version check
    if(!data.version || data.version != 2){
      console.error(`this format is not version 2.`);
      return false;
    }

    /**
     * type of keys
     */
    const types: { [key: string]: TypeofReturnTypes } = {
      version: 'number',
      id: 'string',
      title: 'string',
      reading: 'string',
      pages: 'object',
      author: 'object',
      series: 'object',
      tags: 'object',
    };

    let isManga: boolean = false;

    // check [ NEED ] keys
    for(const key of ['id', 'pages']){
      if(!(key in Object.keys(data))){
        console.error(`Manga.${key} is undefined. [ NEED ]`);
        isManga = false;
      }
    }
  }

  export function checkAuthor(data: any): data is Author{

    // version check
    if(!data.version || data.version != 2){
      console.error(`this format is not version 2.`);
      return false;
    }

    /**
     * type of keys
     */
    const types: { [key: string]: TypeofReturnTypes } = {
      version: 'number',
      id: 'string',
      name: 'string',
      reading: 'string',
      link: 'object',
    };

    /**
     * is valid author information format
     */
    let isAuthor: boolean = true;

    // check [ NEED ] keys
    if(!('id' in Object.keys(data))){
      console.error(`Author.id is undefined. [ NEED ]`);
      isAuthor = false;
    }
    if(typeof data['id'] !== types['id']){
      console.error(`Author.id must to be "${types['id']}", but it is "${typeof data['id']}" type. [ NEED ]`);
      isAuthor = false;
    }

    // check [ WANT ] keys
    if(!('name' in Object.keys(data))){
      console.warn(`Author.name is undefined. [ WANT ]`);
    }
    if(typeof data.name !== types['name']){
      console.error(`Author.name must to be "${types['name']}" type, but it is "${typeof data.name}" type. [ WANT ]`);
      isAuthor = false;
    }

    // check [ MAY ] keys
    for(const key of ['reading', 'link']){
      if(key in Object.keys(data)){
        if(!(typeof data[key] !== types[key])){
          console.error(`Author.${key} must to be "${types[key]}" type, but it is "${typeof data[key]}" type.`);
          isAuthor = false;
        }
      }
    }

    // check invalid keys
    let invalid: boolean = false;
    for(const key of Object.keys(data)){
      if(!(key in Object.keys(types))){
        console.error(`Author.${key} is invalid. [ INVALID ]`);
        invalid = true;
      }
    }
    if(invalid) isAuthor = false;

    // check Author.link keys
    if(data.link && typeof data.link === 'object'){

      // check twitter, pixiv
      for(const key of ['twitter', 'pixiv']){
        if(typeof data.link[key] !== 'string'){
          console.error(`Author.link.${key} must to be "string" type, but it is "${typeof data.link[key]}" type.`);
          isAuthor = false;
        }
      }

      // check other
      if(data.link.other){
        if(!(data.link.other instanceof Map)){
          console.error('Author.link.other must to be "Map<string, string>" type.');
          isAuthor = false;
        } else for(const key of (data.link.other as Map<any, any>).keys()){
          if(typeof key !== 'string'){
            console.error('Author.link.other must to be "Map<string, string>" type.');
            isAuthor = false;
            break;
          }
          if(typeof (data.link.other as Map<string, any>).get(key) !== 'string'){
            console.error('Author.link.other must to be "Map<string, string>" type.');
            isAuthor = false;
            break;
          }
        }
      }

      // check invalid keys
      for(const key of Object.keys(data.link)){
        if(!(key in ['twitter', 'pixiv', 'other'])){
          console.error(`Author.link.${key} is invalid. [ INVALID ]`);
          isAuthor = false;
        }
      }
    }

    return isAuthor;
  }

  export function checkSeries(data: any): data is Series{

    // version check
    if(!data.version || data.version != 2){
      console.error(`this format is not version 2.`);
      return false;
    }

    let isSeries: boolean = true;

    // id check [ NEED ]
    if(!data.id){
      console.error(`Series.id is undefined. [ NEED ]`);
      isSeries = false;
    } else if (typeof data.id !== 'string'){
      console.error(`Series.id must be "string" type, but it is "${typeof data.id}" type.`);
      isSeries = false;
    }

    // name check [ WANT ]
    if(!data.name){
      console.warn(`Series.name is undefined. [ WANT ]`);
    } else if (typeof data.name !== 'string'){
      console.error(`Series.name must be "string" type, but it is "${typeof data.name}" type.`);
      isSeries = false;
    }

    // mangas check [ NEED ]
    if(!data.mangas){
      console.error(`Series.mangas is undefined. [ NEED ]`);
      isSeries = false;
    } else if (!(data.mangas instanceof Array)){
      console.error(`Series.mangas must to be "Array<strng>" type.`);
      isSeries = false;
    } else {
      let isValidArray: boolean = true; 
      for(const manga of (data.mangas as any[])){
        if(typeof manga !== 'string'){
          console.error(`Series.mangas must to be "Array<string>" type.`);
          isValidArray = false;
          break;
        }
      }
      if(!isValidArray) isSeries = false;
    }

    // check invalid key
    for(const key of Object.keys(data)){
      if(!(key in ['version', 'id', 'name', 'mangas'])){
        console.error(`Series.${key} is invalid. [ INVALID ]`);
        isSeries = false;
      }
    }

    return isSeries;
  }

  export function isTag(data: any): data is Tag{

    // check version
    if(!data.version || data.version != 2){
      console.error(`this format is not version 2.`);
      return false;
    }

    let isTag: boolean = true;

    // check id
    if(!data.id){
      console.error(`Tag.id is undefined. [ NEED ]`);
      isTag = false;
    } else if(typeof data.id !== 'string'){
      console.error(`Tag.id must to be "string" type, but it is "${typeof data.id}" type.`);
      isTag = false;
    }

    // check name
    if(!data.name){
      console.error(`Tag.name is undefined. [ NEED ]`);
      isTag = false;
    } else if(typeof data.name !== 'string'){
      console.error(`Tag.anem must to be "string" type, but it is "${typeof data.name}" type.`);
      isTag = false;
    }

    // check invalid keys
    for(const key of Object.keys(data)){
      if(!(key in ['version', 'id', 'name'])){
        console.error(`Tag.${key} is invalid. [ INVALID ]`);
        isTag = false;
      }
    }

    return isTag;
  }
};

export default v2;