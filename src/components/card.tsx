export interface Props {
    check:string,
    size:string,
    sure:boolean
}
export async function RealCard(props: Props) {
    const {check,size,sure} = props
    const responsedemo2 = await fetch(`https://myblogvalue-production.up.railway.app/blog`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // 防止缓存
        },
    });
    function slugify(text: string): string {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')       // 替换空格为 -
            .replace(/&/g, '-and-')     // 替换 & 为 'and'
            .replace(/[^\w\-]+/g, '')   // 移除非单词字符
            .replace(/\-\-+/g, '-');    // 替换多个 - 为单个 -
    }
    const data = await responsedemo2.json();
    const blogMessage = data.comments.filter((item:any)=> (sure?item[check]:!item[check]))
    const headerProps = {
        class: "text-lg font-medium decoration-dashed hover:underline",
    };
    function formatDate(date:Date) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // 转换为12小时制
        hours = hours % 12;
        hours = hours ? hours : 12; // 0应显示为12
        
        return `${day} ${month}, ${year} | at ${hours}:${minutes} ${ampm}`;
    }
    return <div>
        {blogMessage.map((item: any,index:number) => (<>
            <div key={index}   >
                <a
                    href={`/myposts/${slugify(item.title)}`}
                    className="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
                >
                    {
                        size === "h2" ? (
                            <h2 {...headerProps} style={{viewTransitionName: slugify(item.title)}}>{item.title}</h2>
                        ) : (
                            <h3 {...headerProps} style={{viewTransitionName: slugify(item.title)}}>{item.title}</h3>
                        )
                    }</a>
                    <div style={{color:'white'}}>{item.modDatetime?`Updated:${formatDate(new Date(item.modDatetime))}`:`PubDatetime:${formatDate(new Date(item.pubDatetime))}`}</div>
                    <p style={{color:'white'}}>{item.description}</p>
                
            </div>
            <br/>
            </>
            ))}
    </div>
}
