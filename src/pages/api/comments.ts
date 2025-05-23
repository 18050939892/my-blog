// export const prerender = false;
// import type { APIRoute } from 'astro';
// import fs from 'fs/promises';
// import path from 'path';
//
// export const POST: APIRoute = async ({ request }) => {
//     try {
//         const newComment = await request.json();
//
//         // 验证评论数据
//         if (!newComment.author || !newComment.text || !newComment.articleTitle) {
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     message: "昵称和评论内容以及评论对象不能为空",
//                 }),
//                 { status: 400, headers: { "Content-Type": "application/json" } }
//             );
//         }
//
//         // 为评论添加时间戳
//         const commentWithDate = {
//             ...newComment,
//             date: new Date().toISOString(),
//         };
//
//         // 获取评论文件路径
//         const commentsFilePath = path.join(
//             process.cwd(),
//             "src/data/comment/comment.json"
//         );
//
//         // 读取现有评论
//         let commentsData;
//         try {
//             const fileContent = await fs.readFile(commentsFilePath, "utf-8");
//             commentsData = JSON.parse(fileContent);
//         } catch (error) {
//             // 如果文件不存在或内容无效，创建新的结构
//             commentsData = { comments: [] };
//         }
//
//         // 添加新评论
//         commentsData.comments.push(commentWithDate);
//
//         // 保存更新后的评论
//         await fs.writeFile(
//             commentsFilePath,
//             JSON.stringify(commentsData, null, 2),
//             "utf-8"
//         );
//
//         return new Response(
//             JSON.stringify({
//                 success: true,
//                 message: "评论已成功提交",
//             }),
//             { status: 201, headers: { "Content-Type": "application/json" } }
//         );
//
//     } catch (error) {
//         console.error("处理评论时出错:", error);
//
//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "服务器错误，无法处理评论",
//             }),
//             { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//     }
// };

// @ts-nocheck
export const prerender = false;
import type { APIRoute } from 'astro';
import { MongoClient } from 'mongodb';

export const POST: APIRoute = async ({ request }) => {
    // 从环境变量获取连接字符串
    const MONGODB_URI = import.meta.env.MONGODB_URI;
    if (!MONGODB_URI) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "服务器配置错误",
            }),
            { status: 501, headers: { "Content-Type": "application/json" } }
        );
    }
    
    const client = new MongoClient(MONGODB_URI);
    
    // 连接到数据库
    await client.connect();
    const database = client.db("blog");
    const comments = database.collection("comments");
    const newComment = await request.json();
    
    
    try {
        // 验证评论数据
        if (newComment.author === '' && newComment.text === '') {
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
        
        // 为评论添加时间戳
        const commentWithDate = {
            ...newComment,
            date: new Date().toISOString(),
        };
        
        // 添加新评论
        await comments.insertOne(commentWithDate);
        
        return new Response(
            JSON.stringify({
                success: true,
                message: "评论已成功提交",
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
