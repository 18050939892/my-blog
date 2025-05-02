import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, s as spreadAttributes, d as renderTemplate } from './astro/server_DzI7NwzY.mjs';
import { s as slugifyStr } from './slugify_CvQuO4Tx.mjs';
import { $ as $$Datetime } from './Datetime_BJeQ76RP.mjs';

const $$Astro = createAstro("https://astro-paper.pages.dev/");
const $$MyCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyCard;
  const { variant = "h2", data, id } = Astro2.props;
  const { title, description, pubDatetime, modDatetime, timezone } = data;
  const slug = id;
  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    class: "text-lg font-medium decoration-dashed hover:underline"
  };
  return renderTemplate`${maybeRenderHead()}<li class="my-6"> <!--name:{id}<br />--> <!--path:{filePath}<br/>--> <a${addAttribute(`/myposts/${slug}`, "href")} class="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"> ${variant === "h2" ? renderTemplate`<h2${spreadAttributes(headerProps)}>${title}</h2>` : renderTemplate`<h3${spreadAttributes(headerProps)}>${title}</h3>`} </a> ${renderComponent($$result, "Datetime", $$Datetime, { "pubDatetime": pubDatetime, "modDatetime": modDatetime, "timezone": timezone })} <p>${description}</p> </li>`;
}, "D:/Users/LinZhiJie/Downloads/my-blog/src/components/MyCard.astro", void 0);

export { $$MyCard as $ };
