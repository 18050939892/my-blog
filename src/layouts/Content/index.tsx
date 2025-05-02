import { marked } from 'marked'
import { useEffect, useState } from 'react'
export interface Props{
    title:string
}
export function MyContent(props: Props) {
    const {title} = props
    const [content, setContent] = useState<string>('555')
    async  function send(){
    const responsedemo = await fetch('https://myblogvalue-production.up.railway.app/blog', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await responsedemo.json();
    setContent(
        data.comments.filter(
            (item: {title: string}) => item.title === title
        )[0].content
    );
    }
    useEffect(() => {
        send()
    },[])
    const htmlContent = marked(content);
    return <div className="prose"  dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
}
