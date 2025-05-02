import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CBzlTfV0.mjs';
import { manifest } from './manifest_CF02glwB.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/comments.astro.mjs');
const _page4 = () => import('./pages/api/edit-post.astro.mjs');
const _page5 = () => import('./pages/archives.astro.mjs');
const _page6 = () => import('./pages/create.astro.mjs');
const _page7 = () => import('./pages/edit/_---slug_.astro.mjs');
const _page8 = () => import('./pages/login.astro.mjs');
const _page9 = () => import('./pages/myarchives.astro.mjs');
const _page10 = () => import('./pages/myedit/_---slug_.astro.mjs');
const _page11 = () => import('./pages/myposts/_---slug_/index.png.astro.mjs');
const _page12 = () => import('./pages/myposts/_---page_.astro.mjs');
const _page13 = () => import('./pages/myposts/_---slug_.astro.mjs');
const _page14 = () => import('./pages/mysearch.astro.mjs');
const _page15 = () => import('./pages/mytags/_tag_/_---page_.astro.mjs');
const _page16 = () => import('./pages/mytags.astro.mjs');
const _page17 = () => import('./pages/og.png.astro.mjs');
const _page18 = () => import('./pages/posts/_---slug_/index.png.astro.mjs');
const _page19 = () => import('./pages/posts/_---page_.astro.mjs');
const _page20 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page21 = () => import('./pages/robots.txt.astro.mjs');
const _page22 = () => import('./pages/rss.xml.astro.mjs');
const _page23 = () => import('./pages/search.astro.mjs');
const _page24 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page25 = () => import('./pages/tags.astro.mjs');
const _page26 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.md", _page2],
    ["src/pages/api/comments.ts", _page3],
    ["src/pages/api/edit-post.ts", _page4],
    ["src/pages/archives/index.astro", _page5],
    ["src/pages/create.astro", _page6],
    ["src/pages/edit/[...slug]/index.astro", _page7],
    ["src/pages/login.astro", _page8],
    ["src/pages/myarchives/index.astro", _page9],
    ["src/pages/myedit/[...slug]/index.astro", _page10],
    ["src/pages/myposts/[...slug]/index.png.ts", _page11],
    ["src/pages/myposts/[...page].astro", _page12],
    ["src/pages/myposts/[...slug]/index.astro", _page13],
    ["src/pages/mysearch.astro", _page14],
    ["src/pages/mytags/[tag]/[...page].astro", _page15],
    ["src/pages/mytags/index.astro", _page16],
    ["src/pages/og.png.ts", _page17],
    ["src/pages/posts/[...slug]/index.png.ts", _page18],
    ["src/pages/posts/[...page].astro", _page19],
    ["src/pages/posts/[...slug]/index.astro", _page20],
    ["src/pages/robots.txt.ts", _page21],
    ["src/pages/rss.xml.ts", _page22],
    ["src/pages/search.astro", _page23],
    ["src/pages/tags/[tag]/[...page].astro", _page24],
    ["src/pages/tags/index.astro", _page25],
    ["src/pages/index.astro", _page26]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ff7f1354-ebf0-4829-84e2-9a45e6583249",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
