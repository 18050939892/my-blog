import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface PostUpdate {
    frontmatter?: Record<string, any>;
    content?: string;
}

export async function editPost(slug: string, updates: PostUpdate): Promise<{success: boolean; message: string}> {
    try {
        // 确定项目根目录的路径
        // 注意: 在生产环境这可能需要调整
        const projectRoot = process.cwd();
        const postsDir = path.join(projectRoot, "src/data/blog");
        const filePath = path.join(postsDir, `${slug}.md`);
        
        // 检查文件是否存在
        // try {
        //     await fs.access(filePath);
        // } catch  {
        //     return {
        //         success: false,
        //         message: `文章 "${slug}" 不存在`
        //     };
        // }
        
        // 读取文件
        //     const fileContent = await fs.readFile(filePath, "utf-8");
        
        
        
        
        // 解析 frontmatter 和内容
        
        // const { data, content } = fileContent ? matter(fileContent) : { data:undefined, content:undefined };
        
        
        
        // 更新 frontmatter
        const updatedFrontmatter =
            // data ? { ...data, ...(updates.frontmatter || {}) } :
            {  ...(updates.frontmatter || {}) };
        
        
        
        // 更新内容
        // const updatedContent = ;
        const updatedContent =
            // content ?(updates.content !== undefined ? updates.content : content) :
                (updates.content !== undefined ? updates.content : '');
        
        // 重新组合文件内容
        const updatedFileContent = matter.stringify(updatedContent, updatedFrontmatter);
        
        // 写入文件
        await fs.writeFile(filePath, updatedFileContent, "utf-8");
        
        return {
            success: true,
            message: `文章 "${slug}" 已更新成功!`
        };
    } catch (error) {
        console.error(`更新文章 "${slug}" 失败:`, error);
        return {
            success: false,
            message: `更新文章失败: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}


export async function editPut(slug: string, updates: PostUpdate): Promise<{success: boolean; message: string}> {
    try {
        // 确定项目根目录的路径
        // 注意: 在生产环境这可能需要调整
        const projectRoot = process.cwd();
        const postsDir = path.join(projectRoot, "src/data/blog");
        const filePath = path.join(postsDir, `${slug}.md`);
        
        // 检查文件是否存在
        try {
            await fs.access(filePath);
        } catch  {
            return {
                success: false,
                message: `文章 "${slug}" 不存在`
            };
        }
        
        // 读取文件
            const fileContent = await fs.readFile(filePath, "utf-8");
        
        
        
        
        // 解析 frontmatter 和内容
        
        const { data, content } = matter(fileContent);
        
        
        
        // 更新 frontmatter
        const updatedFrontmatter = { ...data, ...(updates.frontmatter || {}) }
        

        
        // 更新内容
        // const updatedContent = ;
        const updatedContent =updates.content !== undefined ? updates.content : content;
        
        // 重新组合文件内容
        const updatedFileContent = matter.stringify(updatedContent, updatedFrontmatter);
        // 写入文件
        await fs.writeFile(filePath, updatedFileContent, "utf-8");
        
        return {
            success: true,
            message: `文章 "${slug}" 已更新成功!`
        };
    } catch (error) {
        console.error(`更新文章 "${slug}" 失败:`, error);
        return {
            success: false,
            message: `更新文章失败: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}


