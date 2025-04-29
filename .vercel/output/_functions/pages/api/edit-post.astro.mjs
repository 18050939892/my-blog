import { MongoClient } from 'mongodb';
export { renderers } from '../../renderers.mjs';

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
    const MONGODB_URI = "mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog";
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const database = client.db("blog");
    const blog = database.collection("blog");
    if (updates.content === "") {
      const allBlogs = await blog.find({}).toArray();
      return new Response(
        JSON.stringify({
          success: true,
          message: "获取所有评论成功",
          comments: allBlogs
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const commentWithDate = {
      content: updates.content,
      ...updates.frontmatter
    };
    if (update) {
      const oldPubDatetime = await blog.find({ title: updates.frontmatter.title }).toArray();
      updates.frontmatter.modDatetime = new Date(updates.frontmatter.pubDatetime);
      updates.frontmatter.pubDatetime = new Date(oldPubDatetime[0].pubDatetime);
      await blog.updateOne(
        { title: updates.frontmatter.title },
        // 查询条件，找到要更新的文档
        { $set: { ...updates.frontmatter, content: updates.content } }
        // 将新评论添加到评论数组
      );
    } else {
      updates.frontmatter.pubDatetime = new Date(updates.frontmatter.pubDatetime);
      await blog.insertOne(commentWithDate);
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "successfully add"
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
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
