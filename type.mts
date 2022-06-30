import * as v2checks from './check.v2.mjs';
import * as v2types from './type.v2.mjs';

export namespace v2{
  // types
  export type Manga = v2types.Manga;
  export type Author = v2types.Author;
  export type Series = v2types.Series;
  export type Tag = v2types.Tag;
  // type gurds
  export const isManga = v2checks.isManga;
  export const isAuthor = v2checks.isAuthor;
  export const isSeries = v2checks.isSeries;
  export const isTag = v2checks.isTag;
};

