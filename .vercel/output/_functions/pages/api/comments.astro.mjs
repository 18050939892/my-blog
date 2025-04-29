import { MongoClient } from 'mongodb';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const MONGODB_URI = "mongodb+srv://18050939892:deerkesi3815@blog.ssrtblo.mongodb.net/blogBatabase?retryWrites=true&w=majority&appName=blog";
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const database = client.db("blog");
  const comments = database.collection("comments");
  const newComment = await request.json();
  try {
    if (newComment.author === "" && newComment.text === "") {
      const allComments = await comments.find({}).toArray();
      return new Response(
        JSON.stringify({
          success: true,
          message: "获取所有评论成功",
          comments: allComments
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const commentWithDate = {
      ...newComment,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    await comments.insertOne(commentWithDate);
    return new Response(
      JSON.stringify({
        success: true,
        message: "评论已成功提交"
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "服务器错误，无法处理评论",
        error: error.toString()
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
