import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
export { renderers } from '../../renderers.mjs';

async function editPost(slug, updates) {
  try {
    const projectRoot = process.cwd();
    const postsDir = path.join(projectRoot, "src/data/blog");
    const filePath = path.join(postsDir, `${slug}.md`);
    const updatedFrontmatter = (
      // data ? { ...data, ...(updates.frontmatter || {}) } :
      { ...updates.frontmatter || {} }
    );
    const updatedContent = (
      // content ?(updates.content !== undefined ? updates.content : content) :
      updates.content !== void 0 ? updates.content : ""
    );
    const updatedFileContent = matter.stringify(updatedContent, updatedFrontmatter);
    await fs.writeFile(filePath, updatedFileContent, "utf-8");
    return {
      success: true,
      message: `文章 "${slug}" 已更新成功!`
    };
  } catch (error) {
    console.error(`更新文章 "${slug}" 失败:`, error);
    return {
      success: false,
      message: `更新文章失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
async function editPut(slug, updates) {
  try {
    const projectRoot = process.cwd();
    const postsDir = path.join(projectRoot, "src/data/blog");
    const filePath = path.join(postsDir, `${slug}.md`);
    try {
      await fs.access(filePath);
    } catch {
      return {
        success: false,
        message: `文章 "${slug}" 不存在`
      };
    }
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const updatedFrontmatter = { ...data, ...updates.frontmatter || {} };
    const updatedContent = updates.content !== void 0 ? updates.content : content;
    const updatedFileContent = matter.stringify(updatedContent, updatedFrontmatter);
    await fs.writeFile(filePath, updatedFileContent, "utf-8");
    return {
      success: true,
      message: `文章 "${slug}" 已更新成功!`
    };
  } catch (error) {
    console.error(`更新文章 "${slug}" 失败:`, error);
    return {
      success: false,
      message: `更新文章失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { slug, updates, update } = data;
    if (!slug) {
      return new Response(JSON.stringify({ error: "缺少文章 slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    updates.frontmatter.pubDatetime = new Date(updates.frontmatter.pubDatetime);
    const result = update ? await editPut(slug, updates) : await editPost(slug, updates);
    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: result.message
        }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: result.message
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `处理请求时出错: ${error instanceof Error ? error.message : String(error)}`
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
