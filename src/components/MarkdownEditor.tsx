// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from 'react';

export default function MarkdownEditor(props) {
    const editorRef = useRef(null);
    const {initialValue}=props;
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
        };
    }, []);

    return <textarea ref={editorRef} id="editor-area" defaultValue={initialValue}></textarea>;
}
// import { useEffect, useRef } from 'react';
//
// interface MarkdownEditorProps {
//     initialValue?: string;
// }
//
// export default function MarkdownEditor({ initialValue = '' }: MarkdownEditorProps) {
//     const editorRef = useRef<HTMLTextAreaElement>(null);
//
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
//                     initialValue: initialValue, // 使用传入的初始值
//                 });
//
//                 document.dispatchEvent(new Event('editorReady'));
//             }
//         };
//         document.body.appendChild(script);
//
//         return () => {
//             if (window.simplemde) {
//                 window.simplemde.toTextArea();
//                 window.simplemde = null;
//             }
//         };
//     }, [initialValue]); // 添加 initialValue 到依赖数组
//
//     return <textarea ref={editorRef} id="editor-area"></textarea>;
// }
