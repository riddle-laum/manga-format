import { Manga, Author, Series, Tag } from './type.v2.mjs';

/**
 * manga format checker
 * @param target target to be checked
 * @returns is target type "Manga" type
 */
export function isManga(target: { [key: string]: any }): target is Manga{
  
  // console error/warning functions
  const error = (...args: any[])=>console.error('[manga-format.v2.isManga]', ...args);
  const warning = (...args: any[])=>console.warn('[manga-format.v2.isManga]', ...args);

  // check version
  if(!target.version || target.version !== 2){
    error('this format is not version 2');
    return false;
  }

  /**
   * does all of [ NEED ] keys exist
   */
  let need: boolean = true;

  /**
   * does all of [ WANT ] key types is correct
   */
  let want: boolean = true;

  /**
   * does all of [ MAY ] key types is correct
   */
  let may: boolean = true;

  // ----- check keys -----

  // Manga.id: string [ NEED ]
  if(typeof target.id !== 'string'){
    if(target.id === undefined) error('Manga.id is undefined [ NEED ]');
    else error(`Manga.id must be "string" type, but it is "${ typeof target.id }" type`);
    need = false;
  }

  // Manga.title: string [ NEED ]
  if(typeof target.title !== 'string'){
    if(target.id === undefined) error('Manga.title is undefined [ NEED ]');
    else error(`Manga.title must be "string" type, but it is "${ typeof target.id }" type`);
    need = false;
  }

  // Manga.reading: string [ WANT ]
  if(typeof target.reading !== 'string'){
    if(target.reading === undefined) warning('Manga.reading is undefined [ WANT ]');
    else{
      error(`Manga.reading must be "string" type, but it is "${ typeof target.reading }" type`);
      want = false;
    }
  }

  // Manga.pages: string[] [ NEED ]
  if(target.pages === undefined){
    error('Manga.pages is undefind [ NEED ]');
    need = false;
  } else{
    const array = target.pages;
    if(array instanceof Array){
      const includeTypes = Array.from(new Set(array.map(v=>typeof v)));
      if(includeTypes.length != 1 || includeTypes[0] != 'string'){
        let typesString: string = includeTypes.join(' | ');
        if(includeTypes.length < 2) typesString = `(${ includeTypes })`;
        error(`Manga.pages must be "string[]" type, but it is "${ typesString }[]" type`);
        need = false;
      }
    } else{
      error(`Manga.pages must be "string[]" type, but it is "${ typeof target.pages }" type`);
      need = false;
    }
  }

  // Manga.author: Author extends object [ WANT ]
  if(typeof target.author != 'object' || !isAuthor(target.author)){
    if(target.author === undefined) warning('Manga.author is undefined [ WANT ]');
    else {
      if(typeof target.author != 'object')
        error(`Manga.author must be "Author" type, but it is "${ typeof target.author }" type`);
      want = false;
    }
  }

  // Manga.series: Series extends object [ MAY ]
  if((target.series !== undefined && typeof target.series != 'object') || (typeof target.series == 'object' && !isSeries(target.series))){
    if(typeof target.series != 'object')
      error(`Manga.series must be "Series" type, but it is "${ typeof target.series }" type`);
    may = false;
  }

  // Manga.tags: (Tag extends object)[] [ WANT ]
  if(target.tags === undefined)
    warning('Manga.tags is undefined [ WANT ]');
  else{
    if(target.tags instanceof Array){
      if(!Array.from(new Set(target.tags.map(v=>isTag(v)))).reduce((a,b)=>a&&b)){
        error(`Manga.tags must be "Tag[]" type, but it is "any[]" type`);
        want = false;
      }
    } else{
      error(`Manga.tags must be "Tag[]" type, but it is "${ typeof target.tags }" type`);
      want = false;
    }
  }

  // ----- check ignored keys -----
  
  /**
   * keys ignored by Manga-format
   */
  let ignored: string[] = [];

  /**
   * keys defined by Manga-format
   */
  const definedKeys: string[] = [ 'version', 'id', 'title', 'reading', 'pages', 'author', 'series', 'tags' ];

  Object.keys(target).forEach((key)=>{
    if(definedKeys.includes(key)) return;
    ignored.push(key);
  });

  if(ignored.length == 1)
    warning(`invalid keys (${ ignored.join(',') }) exist, but they are ignored `);
  if(ignored.length > 1)
    warning(`invalid keys (${ ignored.join(',') }) exist, but they are ignored `);

  // ----- return result -----
  return need && want && may;
}

export function isAuthor(target: { [key: string]: any }): target is Author{

  // console error/warning functions
  const error = (...args: any[])=>console.error('[manga-format.v2.isAuthor]', ...args);
  const warning = (...args: any[])=>console.warn('[manga-format.v2.isAuthor]', ...args);

  // check version
  if(!target.version || target.version !== 2){
    error('this format is not version 2');
    return false;
  }

  // ----- check keys -----

  /**
   * does all of [ NEED ] keys exist
   */
  let need: boolean = true;

  /**
  * are all of [ WANT ] key types is correct
  */
  let want: boolean = true;

  /**
  * are all of [ MAY ] key types is correct
  */
  let may: boolean = true;

  // Author.id: string [ NEED ]
  if(typeof target.id !== 'string'){
    if(target.id == 'undefined') error('Author.id is undefined [ NEED ]');
    else error(`Author.id must be "string" type, but it is "${ typeof target.id }" type`);
    need = false;
  }

  // Author.name: string [ WANT ]
  if(typeof target.name !== 'string'){
    if(target.name == 'undefined') warning('Author.name is undefined [ WANT ]');
    else{
      error(`Author.name must be "string" type, but it is "${ typeof target.name }" type`);
      need = false;
    }
  }

  // Author.reading: string [ MAY ]
  if(target.reading !== undefined && typeof target.reading !== 'string'){
    error(`Author.reading must be "string" type, but it is "${ typeof target.reading }" type`);
    may = false;
  }

  // Author.link: object [ MAY ]
  if(target.link !== undefined && typeof target.link !== 'object'){
    error(`Author.link must be "object" type, but it is "${ typeof target.link }" type`);
    may = false;
  } else if(typeof target.link === 'object'){
    // Author.link.twitter: string [ MAY ]
    if(target.link.twitter !== undefined && typeof target.link.twitter !== 'string'){
      error(`Author.link.twitter must be "string" type, but it is "${ typeof target.link.twitter }" type`);
      may = false;
    }

    // Author.link.pixiv: string [ MAY ]
    if(target.link.pxiiv !== undefined && typeof target.link.pixiv !== 'string'){
      error(`Author.link.pixiv must be "string" type, but it is "${ typeof target.link.pixiv }" type`);
      may = false;
    }

    // Author.link.other: string [ MAY ]
    if(target.link.other !== undefined && typeof target.link.other !== 'object' ){
      error(`Author.link.other must be "object" type, but it is "${ typeof target.link.other }" type`);
      may = false;
    } else{
      const includeTypes = Array.from(new Set(Object.keys(target.link.other).map(v=>typeof target.link.other[v])));
      if(includeTypes.length != 1 && includeTypes[0] != 'string'){
        let typesString: string = `{ [name: string]: ${ includeTypes.join(' | ') } }`;
        if(!includeTypes.length) typesString = '{}';
        error(`Author.link.other must be "{ [name: string]: string }" type, but it is "${ typesString }" type`);
        may = false;
      }
    }

    // Author.link ignored keys
    const definedKeys: string[] = [ 'twitter', 'pixiv', 'others' ];
    const ignored: string[] = Object.keys(target.link).filter(v=>!definedKeys.includes(v));

    if(ignored.length == 1)
      warning(`invalid keys Author.link.${ ignored[0] } exist, but it is ignored `);
    if(ignored.length > 1)
      warning(`invalid keys Author.link.(${ ignored.join(',') }) exist, but they are ignored `);
  }

  // ignored keys
  const definedKeys: string[] = [ 'version', 'id', 'name', 'reading', 'link' ];
  const ignored: string[] = Object.keys(target).filter(v=>!definedKeys.includes(v));

  if(ignored.length == 1)
    warning(`invalid keys Author.${ ignored[0] } exist, but it is ignored `);
  if(ignored.length > 1)
    warning(`invalid keys Author.(${ ignored.join(',') }) exist, but they are ignored `);

  // ----- return result -----
  return need && want && may;
}

/**
 * series format checker
 * @param target target to be checked
 * @returns is target type "Series" type
 */
export function isSeries(target: { [key: string]: any }): target is Series{

  // console error/warning functions
  const error = (...args: any[])=>console.error('[manga-format.v2.isSeries]', ...args);
  const warning = (...args: any[])=>console.warn('[manga-format.v2.isSeries]', ...args);

  // check version
  if(!target.version || target.version !== 2){
    error('this format is not version 2');
    return false;
  }

  // ----- check keys -----

  /**
   * does all [ NEED ] keys exist
   */
  let need: boolean = true;

  /**
   * are all [ WANT ] key types correct
   */
  let want: boolean = true;

  // Series.id: string [ NEED ]
  if(typeof target.id !== 'string'){
    if(target.id === undefined) error('Series.id is undefined [ NEED ]');
    else error(`Series.id must to be "string" type, but it is "${ typeof target.id }" type`);
    need = false;
  }

  // Series.name: string [ NEED ]
  if(typeof target.name !== 'string'){
    if(target.name === undefined) error('Series.name is undefined [ NEED ]');
    else error(`Series.name must to be "string" type, but it is "${ typeof target.name }" type`);
    need = false;
  }

  // Series.reading: string [ WANT ]
  if(typeof target.reading !== 'string'){
    if(target.reading === undefined) warning('Series.reading is undefined [ WANT ]');
    else{
      error(`Series.reading must to be "string" type, but it is "${ typeof target.reading }" type`);
      need = false;
    }
  }
  
  // Series.mangas: string[] [ NEED ]
  if(!target.mangas || !(target.mangas instanceof Array)){
    if(target.mangas === undefined) error('Series.mangas is undefined [ NEED ]');
    else error(`Series.mangas must to be "string[]" type, but it is "${ typeof target.mangas }" type`);
    need = false;
  } else{
    let includeTypes = Array.from(new Set(target.mangas.map(v=>typeof v)));
    if(includeTypes.length != 1 || includeTypes[0] != 'string'){
      let typesString: string = includeTypes.join(' | ');
      if(typesString.length > 1) typesString = `(${ typesString })`;
      if(typesString.length == 0) typesString = 'void';
      error(`Series.mangas must be "string[]" type, but it is "${ typesString }[]" type`);
      need = false;
    }
  }

  // ----- check ignored keys -----
  
  /**
   * keys ignored by Manga-format
   */
  let ignored: string[] = [];

  /**
   * keys defined by Manga-format
   */
  const definedKeys: string[] = [ 'version', 'id', 'name', 'reading', 'mangas' ];

  Object.keys(target).forEach((key)=>{
    if(definedKeys.includes(key)) return;
    ignored.push(key);
  });

  if(ignored.length == 1)
    warning(`invalid key "${ ignored[0] }" exist, but it is ignored `);
  if(ignored.length > 1)
    warning(`invalid keys (${ ignored.join(',') }) exist, but they are ignored `);

  // ----- return result -----
  return need && want;
}

/**
 * tag format checker
 * @param target target to be checked
 * @returns is target type "Tag" type
 */
export function isTag(target: { [key: string]: any }): target is Tag{

  // console error/warning functions
  const error = (...args: any[])=>console.error('[manga-format.v2.isTag]', ...args);
  const warning = (...args: any[])=>console.warn('[manga-format.v2.isTag]', ...args);

  // check version
  if(!target.version || target.version !== 2){
    error('this format is not version 2');
    return false;
  }

  /**
   * does all [ NEED ] keys exist
   */
  let need: boolean = true;

  /**
   * are all [ WANT ] key types correct
   */
  let want: boolean = true;

  // ----- check keys -----

  // Tag.id: string [ NEED ]
  if(typeof target.id !== 'string'){
    if(target.id === undefined) error(`Tag.id is undefined [ NEED ]`);
    else error(`Tag.id must be "string" type, but it is "${ typeof target.id }" type`);
    need = false;
  }

  // Tag.name: string [ NEED ]
  if(typeof target.name !== 'string'){
    if(target.name === undefined) error(`Tag.name is undefined [ NEED ]`);
    else error(`Tag.name must be "string" type, but it is "${ typeof target.name }" type`);
    need = false;
  }

  // Tag.reading: string [ WANT ]
  if(typeof target.reading !== 'string'){
    if(target.reading === undefined) warning('Tag.reading is undefined [ WANT ]');
    else {
      error(`Tag.reading must be "string" type, but it is "${ typeof target.reading }" type`);
      want = false;
    }
  }

  // ----- check ignored keys -----
  
  /**
   * keys ignored by Manga-format
   */
  let ignored: string[] = [];

  /**
   * keys defined by Manga-format
   */
  const definedKeys: string[] = [ 'version', 'id', 'name', 'reading' ];

  Object.keys(target).forEach((key)=>{
    if(definedKeys.includes(key)) return;
    ignored.push(key);
  });

  if(ignored.length == 1)
    warning(`invalid keys "${ ignored[0] }" exist, but it is ignored `);
  if(ignored.length > 1)
    warning(`invalid keys (${ ignored.join(',') }) exist, but they are ignored `);

  // ----- return result -----
  return need && want;
}
