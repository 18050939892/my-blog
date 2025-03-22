export const prerender = false;
import type { APIRoute } from "astro";
import { editPost, editPut } from "@/lib/postEditor.ts";

export const POST: APIRoute = async ({ request }) => {
  try {
    // 身份验证检查 (示例 - 应使用更安全的方法)
    // const authHeader = request.headers.get("Authorization");
    // if (!authHeader || !authHeader.startsWith("Bearer ") ||
    //     authHeader.substring(7) !== import.meta.env.ADMIN_SECRET) {
    //     return new Response(JSON.stringify({ error: "未授权" }), {
    //         status: 401,
    //         headers: { "Content-Type": "application/json" }
    //     });
    // }

    // 解析请求数据
    const data = await request.json();
    const { slug, updates, update } = data;

    if (!slug) {
      return new Response(JSON.stringify({ error: "缺少文章 slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    updates.frontmatter.pubDatetime = new Date(updates.frontmatter.pubDatetime);
    // 调用 editPost 函数

    const result = update
      ? await editPut(slug, updates)
      : await editPost(slug, updates);

    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: result.message,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: result.message,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `处理请求时出错: ${error instanceof Error ? error.message : String(error)}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};



