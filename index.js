// Immediately Invoked Function Expression (IIFE)
(() => {
    console.log('this tool is git file recover.');
})();

const fs = require('fs');
const path = require('path');

// 读取并解析文件
const parseFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const hashes = [];

    lines.forEach(line => {
        const parts = line.split(' ');
        if (parts.length === 3) {
            hashes.push(parts[2]);
        }
    });

    return hashes;
};

// 复制文件到目标目录
const copyFiles = (hashes, srcDir, destDir) => {
    hashes.forEach(hash => {
        const prefix = hash.slice(0, 2);
        const filename = hash.slice(2);
        const srcPath = path.join(srcDir, prefix, filename);
        const destDirPath = path.join(destDir, prefix);

        // 确保目标目录存在
        if (!fs.existsSync(destDirPath)) {
            fs.mkdirSync(destDirPath, { recursive: true });
        }

        const destPath = path.join(destDirPath, filename);

        // 复制文件
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} to ${destPath}`);
        } else {
            console.log(`File not found: ${srcPath}`);
        }
    });
};

const recover = (inputFilePath, sourceDir, targetDir) => {
    // 解析文件，获取hash列表
    const hashes = parseFile(inputFilePath);
    // 复制文件到目标目录
    copyFiles(hashes, sourceDir, targetDir);
};

exports.recover = recover;