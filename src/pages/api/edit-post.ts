// export const prerender = false;
// import type { APIRoute } from "astro";
// import { editPost, editPut } from "@/lib/postEditor.ts";
//
// export const POST: APIRoute = async ({ request }) => {
//   try {
//     // 身份验证检查 (示例 - 应使用更安全的方法)
//     // const authHeader = request.headers.get("Authorization");
//     // if (!authHeader || !authHeader.startsWith("Bearer ") ||
//     //     authHeader.substring(7) !== import.meta.env.ADMIN_SECRET) {
//     //     return new Response(JSON.stringify({ error: "未授权" }), {
//     //         status: 401,
//     //         headers: { "Content-Type": "application/json" }
//     //     });
//     // }
//
//     // 解析请求数据
//     const data = await request.json();
//     const { slug, updates, update } = data;
//
//     if (!slug) {
//       return new Response(JSON.stringify({ error: "缺少文章 slug" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     updates.frontmatter.pubDatetime = new Date(updates.frontmatter.pubDatetime);
//     // 调用 editPost 函数
//
//     const result = update
//       ? await editPut(slug, updates)
//       : await editPost(slug, updates);
//
//     if (result.success) {
//       return new Response(
//         JSON.stringify({
//           success: true,
//           message: result.message,
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({
//           error: result.message,
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         error: `处理请求时出错: ${error instanceof Error ? error.message : String(error)}`,
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// };




export const prerender = false;
import type { APIRoute } from "astro";
// import { editPost, editPut } from "@/lib/postEditor.ts";
import { MongoClient } from 'mongodb'

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
    const { slug, updates , update} = data;

    if (!slug) {
      return new Response(JSON.stringify({ error: "缺少文章 slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    

    
    
    
    // 调用 editPost 函数
    
    

    
    // const result = update
    //   ? await editPut(slug, updates)
    //   : await editPost(slug, updates);
      
      const MONGODB_URI = import.meta.env.MONGODB_URI;
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const database = client.db("blog");
      const blog = database.collection("blog");
      
      
      if (updates.content === '') {
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
         content:updates.content,
          ...updates.frontmatter,
         
      };
      
      
      // 添加新评论
      if(update){
          const oldPubDatetime = await blog.find({title:updates.frontmatter.title}).toArray();
          updates.frontmatter.modDatetime = new Date(updates.frontmatter.pubDatetime);
          updates.frontmatter.pubDatetime = new Date(oldPubDatetime[0].pubDatetime);
          await blog.updateOne(
              { title: updates.frontmatter.title}, // 查询条件，找到要更新的文档
              {  $set: {...updates.frontmatter,content:updates.content }} // 将新评论添加到评论数组
          );
      }else{
          updates.frontmatter.pubDatetime = new Date(updates.frontmatter.pubDatetime);
          await blog.insertOne(commentWithDate);
      }
      
      
      return new Response(
          JSON.stringify({
              success: true,
              message: 'successfully add',
          }),
          {
              headers: { "Content-Type": "application/json" },
          }
      );
      
      
      
    // if (result.success) {
    //   return new Response(
    //     JSON.stringify({
    //       success: true,
    //       message: result.message,
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // } else {
    //   return new Response(
    //     JSON.stringify({
    //       error: result.message,
    //     }),
    //     {
    //       status: 400,
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // }
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



