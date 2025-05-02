import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, d as renderTemplate, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_DzI7NwzY.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_5ETxj6gM.mjs';
import { c as createSvgComponent, $ as $$Layout, a as $$Header, b as $$LinkButton, S as SOCIALS, e as $$Socials, f as $$Hr, d as $$Footer } from '../chunks/Footer_C74O1_X4.mjs';
import { $ as $$MyCard } from '../chunks/MyCard_BcViPrPJ.mjs';
import { g as getSortedPosts } from '../chunks/getSortedPosts_Dt37fclA.mjs';
import { I as IconArrowRight } from '../chunks/IconArrowRight_DPr4FMi-.mjs';
export { renderers } from '../renderers.mjs';

const IconRss = createSvgComponent({"meta":{"src":"/_astro/IconRss.BYWRoVjV.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-rss"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M4 4a16 16 0 0 1 16 16\" /><path d=\"M4 11a9 9 0 0 1 9 9\" />"});

const $$Astro = createAstro("https://astro-paper.pages.dev/");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  sortedPosts.filter(({ data: data2 }) => data2.featured);
  const recentPosts = sortedPosts.filter(({ data: data2 }) => !data2.featured);
  const responsedemo2 = await fetch(`https://myblogvalue-production.up.railway.app/blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await responsedemo2.json();
  const blogMessage = data.comments.filter((item) => item.featured);
  const recentBlogMessage = data.comments.filter((item) => !item.featured);
  function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" data-layout="index"> <section id="hero" class="pt-8 pb-6"> <h1 class="my-4 inline-block text-4xl font-bold sm:my-8 sm:text-5xl">
Mingalaba
</h1> <a target="_blank" href="/rss.xml" class="inline-block" aria-label="rss feed" title="RSS Feed"> ${renderComponent($$result2, "IconRss", IconRss, { "width": 20, "height": 20, "class": "scale-125 stroke-accent stroke-3" })} <span class="sr-only">RSS Feed</span> </a> <p>
AstroPaper is a minimal, responsive, accessible and SEO-friendly Astro
        blog theme. This theme follows best practices and provides accessibility
        out of the box. Light and dark mode are supported by default. Moreover,
        additional color schemes can also be configured.
</p> <p class="mt-2">
Read the blog posts or check
${renderComponent($$result2, "LinkButton", $$LinkButton, { "class": "underline decoration-dashed underline-offset-4 hover:text-accent", "href": "https://github.com/satnaing/astro-paper#readme" }, { "default": async ($$result3) => renderTemplate`
README
` })} for more info.
</p> ${// only display if at least one social link is enabled
  SOCIALS.length > 0 && renderTemplate`<div class="mt-4 flex flex-col sm:flex-row sm:items-center"> <div class="mr-2 mb-1 whitespace-nowrap sm:mb-0">Social Links:</div> ${renderComponent($$result2, "Socials", $$Socials, {})} </div>`} </section> ${renderComponent($$result2, "Hr", $$Hr, {})} <!--{blogMessage.map((item:any) => (--> <!--    <div key={item.id}>{item.title}</div>--> <!--))}--> <!--{featuredPosts.map((item:any) => (--> <!--    <div key={item.id}>{item.data.id}</div>--> <!--))}--> <!--{--> <!--    featuredPosts.length > 0 && (--> <!--    <>--> <!--      <section id="featured" class="pt-12 pb-6">--> <!--        <h2 class="text-2xl font-semibold tracking-wide">Featured</h2>--> <!--        <ul>--> <!--          {featuredPosts.map(data => (--> <!--            &lt;!&ndash;<Card variant="h3" {...data}  />&ndash;&gt;--> <!--            <MyCard variant="h3" {...data}  />--> <!--            &lt;!&ndash;<Card variant="h3" {...data} data={data} id={data._id} />&ndash;&gt;--> <!--          ))}--> <!--        </ul>--> <!--      </section>--> <!--      {recentPosts.length > 0 && <Hr />}--> <!--    </>--> <!--  )--> <!--}    --> ${blogMessage.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <section id="featured" class="pt-12 pb-6"> <h2 class="text-2xl font-semibold tracking-wide">Featured</h2> <ul> ${blogMessage.map((data2) => renderTemplate`<!--{featuredPosts.map((data:any) => (-->
                <!--<Card variant="h3" {...data}  />-->
                <!--<MyCard variant="h3" {...data}  />-->
                ${renderComponent($$result3, "MyCard", $$MyCard, { "variant": "h3", "data": data2, "id": slugify(data2.title) })}`)} </ul> </section> ${recentPosts.length > 0 && renderTemplate`${renderComponent($$result3, "Hr", $$Hr, {})}`}` })}`} <!--{--> <!--  recentPosts.length > 0 && (--> <!--    <section id="recent-posts" class="pt-12 pb-6">--> <!--      <h2 class="text-2xl font-semibold tracking-wide">Recent Posts</h2>--> <!--      <ul>--> <!--        {recentPosts.map(--> <!--          (data, index) =>--> <!--            index < SITE.postPerIndex && <Card variant="h3" {...data} />--> <!--        )}--> <!--      </ul>--> <!--    </section>--> <!--  )--> <!--}    --> ${recentBlogMessage.length > 0 && renderTemplate`<section id="recent-posts" class="pt-12 pb-6"> <h2 class="text-2xl font-semibold tracking-wide">Recent Posts</h2> <ul> ${recentBlogMessage.map(
    (data2, index) => index < 4 && renderTemplate`${renderComponent($$result2, "MyCard", $$MyCard, { "variant": "h3", "data": data2, "id": slugify(data2.title) })}`
  )} </ul> </section>`} <div class="my-8 text-center"> <!--<LinkButton href="/posts/">--> <!--  All Posts--> <!--  <IconArrowRight class="inline-block" />      --> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": "/myposts/" }, { "default": async ($$result3) => renderTemplate`
All Posts
${renderComponent($$result3, "IconArrowRight", IconArrowRight, { "class": "inline-block" })} ` })} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "D:/Users/LinZhiJie/Downloads/my-blog/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Users/LinZhiJie/Downloads/my-blog/src/pages/index.astro", void 0);

const $$file = "D:/Users/LinZhiJie/Downloads/my-blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
