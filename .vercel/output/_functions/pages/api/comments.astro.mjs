import fs from 'fs/promises';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const newComment = await request.json();
    if (!newComment.author || !newComment.text || !newComment.articleTitle) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "昵称和评论内容以及评论对象不能为空"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const commentWithDate = {
      ...newComment,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    const commentsFilePath = path.join(
      process.cwd(),
      "src/data/comment/comment.json"
    );
    let commentsData;
    try {
      const fileContent = await fs.readFile(commentsFilePath, "utf-8");
      commentsData = JSON.parse(fileContent);
    } catch (error) {
      commentsData = { comments: [] };
    }
    commentsData.comments.push(commentWithDate);
    await fs.writeFile(
      commentsFilePath,
      JSON.stringify(commentsData, null, 2),
      "utf-8"
    );
    return new Response(
      JSON.stringify({
        success: true,
        message: "评论已成功提交"
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("处理评论时出错:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "服务器错误，无法处理评论"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
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
