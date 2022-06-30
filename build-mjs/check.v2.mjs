export function isManga(target) {
    const error = (...args) => console.error('[manga-format.v2.isManga]', ...args);
    const warning = (...args) => console.warn('[manga-format.v2.isManga]', ...args);
    if (!target.version || target.version !== 2) {
        error('this format is not version 2');
        return false;
    }
    let need = true;
    let want = true;
    let may = true;
    if (typeof target.id !== 'string') {
        if (target.id === undefined)
            error('Manga.id is undefined [ NEED ]');
        else
            error(`Manga.id must be "string" type, but it is "${typeof target.id}" type`);
        need = false;
    }
    if (typeof target.title !== 'string') {
        if (target.id === undefined)
            error('Manga.title is undefined [ NEED ]');
        else
            error(`Manga.title must be "string" type, but it is "${typeof target.id}" type`);
        need = false;
    }
    if (typeof target.reading !== 'string') {
        if (target.reading === undefined)
            warning('Manga.reading is undefined [ WANT ]');
        else {
            error(`Manga.reading must be "string" type, but it is "${typeof target.reading}" type`);
            want = false;
        }
    }
    if (target.pages === undefined) {
        error('Manga.pages is undefind [ NEED ]');
        need = false;
    }
    else {
        const array = target.pages;
        if (array instanceof Array) {
            const includeTypes = Array.from(new Set(array.map(v => typeof v)));
            if (includeTypes.length != 1 || includeTypes[0] != 'string') {
                let typesString = includeTypes.join(' | ');
                if (includeTypes.length < 2)
                    typesString = `(${includeTypes})`;
                error(`Manga.pages must be "string[]" type, but it is "${typesString}[]" type`);
                need = false;
            }
        }
        else {
            error(`Manga.pages must be "string[]" type, but it is "${typeof target.pages}" type`);
            need = false;
        }
    }
    if (typeof target.author != 'object' || !isAuthor(target.author)) {
        if (target.author === undefined)
            warning('Manga.author is undefined [ WANT ]');
        else {
            if (typeof target.author != 'object')
                error(`Manga.author must be "Author" type, but it is "${typeof target.author}" type`);
            want = false;
        }
    }
    if ((target.series !== undefined && typeof target.series != 'object') || (typeof target.series == 'object' && !isSeries(target.series))) {
        if (typeof target.series != 'object')
            error(`Manga.series must be "Series" type, but it is "${typeof target.series}" type`);
        may = false;
    }
    if (target.tags === undefined)
        warning('Manga.tags is undefined [ WANT ]');
    else {
        if (target.tags instanceof Array) {
            if (!Array.from(new Set(target.tags.map(v => isTag(v)))).reduce((a, b) => a && b)) {
                error(`Manga.tags must be "Tag[]" type, but it is "any[]" type`);
                want = false;
            }
        }
        else {
            error(`Manga.tags must be "Tag[]" type, but it is "${typeof target.tags}" type`);
            want = false;
        }
    }
    let ignored = [];
    const definedKeys = ['version', 'id', 'title', 'reading', 'pages', 'author', 'series', 'tags'];
    Object.keys(target).forEach((key) => {
        if (definedKeys.includes(key))
            return;
        ignored.push(key);
    });
    if (ignored.length == 1)
        warning(`invalid keys (${ignored.join(',')}) exist, but they are ignored `);
    if (ignored.length > 1)
        warning(`invalid keys (${ignored.join(',')}) exist, but they are ignored `);
    return need && want && may;
}
export function isAuthor(target) {
    const error = (...args) => console.error('[manga-format.v2.isAuthor]', ...args);
    const warning = (...args) => console.warn('[manga-format.v2.isAuthor]', ...args);
    if (!target.version || target.version !== 2) {
        error('this format is not version 2');
        return false;
    }
    let need = true;
    let want = true;
    let may = true;
    if (typeof target.id !== 'string') {
        if (target.id == 'undefined')
            error('Author.id is undefined [ NEED ]');
        else
            error(`Author.id must be "string" type, but it is "${typeof target.id}" type`);
        need = false;
    }
    if (typeof target.name !== 'string') {
        if (target.name == 'undefined')
            warning('Author.name is undefined [ WANT ]');
        else {
            error(`Author.name must be "string" type, but it is "${typeof target.name}" type`);
            need = false;
        }
    }
    if (target.reading !== undefined && typeof target.reading !== 'string') {
        error(`Author.reading must be "string" type, but it is "${typeof target.reading}" type`);
        may = false;
    }
    if (target.link !== undefined && typeof target.link !== 'object') {
        error(`Author.link must be "object" type, but it is "${typeof target.link}" type`);
        may = false;
    }
    else if (typeof target.link === 'object') {
        if (target.link.twitter !== undefined && typeof target.link.twitter !== 'string') {
            error(`Author.link.twitter must be "string" type, but it is "${typeof target.link.twitter}" type`);
            may = false;
        }
        if (target.link.pxiiv !== undefined && typeof target.link.pixiv !== 'string') {
            error(`Author.link.pixiv must be "string" type, but it is "${typeof target.link.pixiv}" type`);
            may = false;
        }
        if (target.link.other !== undefined && typeof target.link.other !== 'object') {
            error(`Author.link.other must be "object" type, but it is "${typeof target.link.other}" type`);
            may = false;
        }
        else {
            const includeTypes = Array.from(new Set(Object.keys(target.link.other).map(v => typeof target.link.other[v])));
            if (includeTypes.length != 1 && includeTypes[0] != 'string') {
                let typesString = `{ [name: string]: ${includeTypes.join(' | ')} }`;
                if (!includeTypes.length)
                    typesString = '{}';
                error(`Author.link.other must be "{ [name: string]: string }" type, but it is "${typesString}" type`);
                may = false;
            }
        }
        const definedKeys = ['twitter', 'pixiv', 'others'];
        const ignored = Object.keys(target.link).filter(v => !definedKeys.includes(v));
        if (ignored.length == 1)
            warning(`invalid keys Author.link.${ignored[0]} exist, but it is ignored `);
        if (ignored.length > 1)
            warning(`invalid keys Author.link.(${ignored.join(',')}) exist, but they are ignored `);
    }
    const definedKeys = ['version', 'id', 'name', 'reading', 'link'];
    const ignored = Object.keys(target).filter(v => !definedKeys.includes(v));
    if (ignored.length == 1)
        warning(`invalid keys Author.${ignored[0]} exist, but it is ignored `);
    if (ignored.length > 1)
        warning(`invalid keys Author.(${ignored.join(',')}) exist, but they are ignored `);
    return need && want && may;
}
export function isSeries(target) {
    const error = (...args) => console.error('[manga-format.v2.isSeries]', ...args);
    const warning = (...args) => console.warn('[manga-format.v2.isSeries]', ...args);
    if (!target.version || target.version !== 2) {
        error('this format is not version 2');
        return false;
    }
    let need = true;
    let want = true;
    if (typeof target.id !== 'string') {
        if (target.id === undefined)
            error('Series.id is undefined [ NEED ]');
        else
            error(`Series.id must to be "string" type, but it is "${typeof target.id}" type`);
        need = false;
    }
    if (typeof target.name !== 'string') {
        if (target.name === undefined)
            error('Series.name is undefined [ NEED ]');
        else
            error(`Series.name must to be "string" type, but it is "${typeof target.name}" type`);
        need = false;
    }
    if (typeof target.reading !== 'string') {
        if (target.reading === undefined)
            warning('Series.reading is undefined [ WANT ]');
        else {
            error(`Series.reading must to be "string" type, but it is "${typeof target.reading}" type`);
            need = false;
        }
    }
    if (!target.mangas || !(target.mangas instanceof Array)) {
        if (target.mangas === undefined)
            error('Series.mangas is undefined [ NEED ]');
        else
            error(`Series.mangas must to be "string[]" type, but it is "${typeof target.mangas}" type`);
        need = false;
    }
    else {
        let includeTypes = Array.from(new Set(target.mangas.map(v => typeof v)));
        if (includeTypes.length != 1 || includeTypes[0] != 'string') {
            let typesString = includeTypes.join(' | ');
            if (typesString.length > 1)
                typesString = `(${typesString})`;
            if (typesString.length == 0)
                typesString = 'void';
            error(`Series.mangas must be "string[]" type, but it is "${typesString}[]" type`);
            need = false;
        }
    }
    let ignored = [];
    const definedKeys = ['version', 'id', 'name', 'reading', 'mangas'];
    Object.keys(target).forEach((key) => {
        if (definedKeys.includes(key))
            return;
        ignored.push(key);
    });
    if (ignored.length == 1)
        warning(`invalid key "${ignored[0]}" exist, but it is ignored `);
    if (ignored.length > 1)
        warning(`invalid keys (${ignored.join(',')}) exist, but they are ignored `);
    return need && want;
}
export function isTag(target) {
    const error = (...args) => console.error('[manga-format.v2.isTag]', ...args);
    const warning = (...args) => console.warn('[manga-format.v2.isTag]', ...args);
    if (!target.version || target.version !== 2) {
        error('this format is not version 2');
        return false;
    }
    let need = true;
    let want = true;
    if (typeof target.id !== 'string') {
        if (target.id === undefined)
            error(`Tag.id is undefined [ NEED ]`);
        else
            error(`Tag.id must be "string" type, but it is "${typeof target.id}" type`);
        need = false;
    }
    if (typeof target.name !== 'string') {
        if (target.name === undefined)
            error(`Tag.name is undefined [ NEED ]`);
        else
            error(`Tag.name must be "string" type, but it is "${typeof target.name}" type`);
        need = false;
    }
    if (typeof target.reading !== 'string') {
        if (target.reading === undefined)
            warning('Tag.reading is undefined [ WANT ]');
        else {
            error(`Tag.reading must be "string" type, but it is "${typeof target.reading}" type`);
            want = false;
        }
    }
    let ignored = [];
    const definedKeys = ['version', 'id', 'name', 'reading'];
    Object.keys(target).forEach((key) => {
        if (definedKeys.includes(key))
            return;
        ignored.push(key);
    });
    if (ignored.length == 1)
        warning(`invalid keys "${ignored[0]}" exist, but it is ignored `);
    if (ignored.length > 1)
        warning(`invalid keys (${ignored.join(',')}) exist, but they are ignored `);
    return need && want;
}
