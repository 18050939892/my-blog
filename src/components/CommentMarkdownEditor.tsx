 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck
// import { useEffect, useRef } from 'react';
//
// export async  function CommentMarkdownEditor(props) {
//     const editorRef = useRef(null);
//     const {initialValue}=props;
//     // useEffect(() => {,[]}
//     const responsedemo2 = await fetch(`https://myblogvalue-production.up.railway.app/blog`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache', // 防止缓存
//         },
//     });
//     const data =await responsedemo2.json();
//
//     const blogMessage=data.comments.filter((item:any)=>(item.title==initialValue))[0]
//     useEffect(() => {
//         // 动态加载CSS
//         const link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css';
//         document.head.appendChild(link);
//
//         // 动态加载JS
//         const script = document.createElement('script');
//         script.src = 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js';
//         script.onload = () => {
//             // 脚本加载完成后初始化编辑器
//             if (editorRef.current && typeof window.SimpleMDE !== 'undefined') {
//                 // 创建编辑器并保存到全局变量
//                 window.simplemde = new window.SimpleMDE({
//                     element: editorRef.current,
//                     spellChecker: false,
//                     autofocus: true,
//                     placeholder: '在这里输入 Markdown 内容...',
//                 });
//
//                 // 触发一个自定义事件，表示编辑器已准备好
//                 document.dispatchEvent(new Event('editorReady'));
//             }
//         };
//         document.body.appendChild(script);
//
//         return () => {
//             // 清理编辑器
//             if (window.simplemde) {
//                 window.simplemde.toTextArea();
//                 window.simplemde = null;
//             }
//         };
//     }, []);
//
//     return <textarea ref={editorRef} id="editor-area" defaultValue={blogMessage.content}></textarea>;
// }
 import { useEffect, useRef, useState } from 'react';
 
 export function CommentMarkdownEditor(props) {
     const editorRef = useRef(null);
     const { initialValue } = props;
     const [content, setContent] = useState('');
     const [isLoading, setIsLoading] = useState(true);
     
     // 使用 useEffect 来获取博客内容
     useEffect(() => {
         async function fetchBlogData() {
             try {
                 setIsLoading(true);
                 const response = await fetch(`https://myblogvalue-production.up.railway.app/blog`, {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                         'Cache-Control': 'no-cache', // 防止缓存
                     },
                 });
                 
                 if (!response.ok) {
                     throw new Error('Failed to fetch blog data');
                 }
                 
                 const data = await response.json();
                 const blogMessage = data.comments.filter((item) => (item.title === initialValue))[0];
                 
                 if (blogMessage && blogMessage.content) {
                     setContent(blogMessage.content);
                 }
             } catch (error) {
                 console.error('Error fetching blog data:', error);
             } finally {
                 setIsLoading(false);
             }
         }
         
         if (initialValue) {
             fetchBlogData();
         }
     }, [initialValue]);
     
     // 使用 useEffect 初始化编辑器
     useEffect(() => {
         // 动态加载CSS
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css';
         document.head.appendChild(link);
         
         // 动态加载JS
         const script = document.createElement('script');
         script.src = 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js';
         script.onload = () => {
             // 脚本加载完成后初始化编辑器
             if (editorRef.current && typeof window.SimpleMDE !== 'undefined') {
                 // 创建编辑器并保存到全局变量
                 window.simplemde = new window.SimpleMDE({
                     element: editorRef.current,
                     spellChecker: false,
                     autofocus: true,
                     placeholder: '在这里输入 Markdown 内容...',
                 });
                 
                 // 如果已经有内容，设置到编辑器中
                 if (content && window.simplemde) {
                     window.simplemde.value(content);
                 }
                 
                 // 触发一个自定义事件，表示编辑器已准备好
                 document.dispatchEvent(new Event('editorReady'));
             }
         };
         document.body.appendChild(script);
         
         return () => {
             // 清理编辑器
             if (window.simplemde) {
                 window.simplemde.toTextArea();
                 window.simplemde = null;
             }
             // 移除添加的元素
             document.head.removeChild(link);
             document.body.removeChild(script);
         };
     }, [content]); // 依赖项中添加 content，以便内容加载后更新编辑器
     
     return (
         <>
             {isLoading && <div>加载编辑器中...</div>}
             <textarea ref={editorRef} id="editor-area" defaultValue="" style={{ display: isLoading ? 'none' : 'block' }}></textarea>
         </>
     );
 }
