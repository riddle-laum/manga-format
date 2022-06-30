"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_mjs_1 = require("./build-mjs/type.mjs");
console.log('[test.mts]', '----- start testing -----');
const testcases = [
    { other: 2 },
    { version: 1 },
    { version: 2 },
    { version: 2, id: 1, title: 1, reading: 1, pages: 0, author: 0, series: 0, tags: 0 },
    { version: 2, id: 'id', pages: [] },
    { version: 2, id: 'id', pages: ['string', 1, []] },
];
testcases.forEach((target) => {
    console.log('\n[test.mts]', 'testdata:', JSON.stringify(target));
    console.log('[test.mts]', 'result =>', type_mjs_1.v2.isManga(target));
});
