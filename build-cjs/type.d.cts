import * as v2checks from './check.v2.mjs';
import * as v2types from './type.v2.mjs';
export declare namespace v2 {
    type Manga = v2types.Manga;
    type Author = v2types.Author;
    type Series = v2types.Series;
    type Tag = v2types.Tag;
    const isManga: typeof v2checks.isManga;
    const isAuthor: typeof v2checks.isAuthor;
    const isSeries: typeof v2checks.isSeries;
    const isTag: typeof v2checks.isTag;
}
