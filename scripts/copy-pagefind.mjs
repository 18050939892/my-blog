// 使用 ESM 语法导入模块
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 复制目录函数
function copyDirectory(source, destination) {
  // 创建目标目录（如果不存在）
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // 读取源目录中的文件和子目录
  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    // 检查是文件还是目录
    if (fs.statSync(sourcePath).isDirectory()) {
      // 递归复制子目录
      copyDirectory(sourcePath, destinationPath);
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

// 执行复制操作
try {
  const sourceDir = path.resolve(__dirname, '../dist/pagefind');
  const targetDir = path.resolve(__dirname, '../public/pagefind');

  console.log(`正在将搜索索引从 ${sourceDir} 复制到 ${targetDir}...`);
  copyDirectory(sourceDir, targetDir);
  console.log('搜索索引复制完成！');
} catch (error) {
  console.error('复制索引文件时出错:', error);
  process.exit(1);
}
