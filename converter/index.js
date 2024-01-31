// Convert markdown files to HTML files by marked.js
// Ny ejs template, convert markdown to html

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');
const hljs = require('highlight.js');
const jsdom = require('jsdom');


function convertMarkdownToHTML(content) {
    let parsedContent = marked.parse(content);
    const dom = new jsdom.JSDOM(parsedContent);
    const root = dom.window.document.body;

    // title
    const title = root.querySelector('h1').textContent;
    // highlight.js
    const codeBlocks = root.querySelectorAll("code");

    codeBlocks.forEach((code) => {
      // 言語クラスを取得（例：language-js）
      const languageClass = Array.from(code.classList).find((className) =>
        className.startsWith("language-")
      );
      // 言語名のみを抽出（例：js）
      const language = languageClass ? languageClass.split("-")[1] : null;
      // ハイライト処理
      const highlightedCode = language
        ? hljs.highlight(code.textContent, { language }).value
        : hljs.highlightAuto(code.textContent).value;
      // ハイライトされた内容で置き換え
      code.innerHTML = highlightedCode;
    });

    parsedContent = dom.serialize();

    const template = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8');
    const html = ejs.render(template, { title: title, content: parsedContent });
    return html;
}

function convertFileToHTML(filePath) {
    return convertMarkdownToHTML(fs.readFileSync(filePath, 'utf8'));
}

function parseTitle(content) {
    const firstLine = content.split('\n')[0];
    return firstLine.replace(/^# /, '');
}

function getPostList(directoryPath) {
    const fileList = fs.readdirSync(directoryPath);
    const postList = fileList.map(function (file) {
        const filePath = path.join(directoryPath, file);
        return {
            id: path.basename(file, '.md'),
            title: parseTitle(fs.readFileSync(filePath, 'utf8')),
            createdAt: createdAt(filePath)
        };
    });
    // sort by createdAt desc
    postList.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        } else {
            return -1;
        }
    });
    return postList;
}

function getMarkdownFileList(directoryPath) {
    const fileList = fs.readdirSync(directoryPath);
    const markdownFileList = fileList.filter(function (file) {
        return path.extname(file) === '.md';
    });
    return markdownFileList;
}

function createIndexPage(directoryPath, outputDirectoryPath) {
    const markdownFileList = getMarkdownFileList(directoryPath);
    const htmlFileList = markdownFileList.map(function (file) {
        return path.basename(file, '.md') + '.html';
    });
    const template = fs.readFileSync(path.join(__dirname, 'index.ejs'), 'utf8');
    const html = ejs.render(template, { posts: getPostList(directoryPath) });
    fs.writeFileSync(path.join(outputDirectoryPath, 'index.html'), html);
}

function createdAt(filePath) {
    const stat = fs.statSync(filePath);
    return stat.birthtime;
}

function convertMarkdownFilesToHTML(directoryPath, outputDirectoryPath) {
    const markdownFileList = getMarkdownFileList(directoryPath);
    markdownFileList.forEach(function (file) {
        var markdownFilePath = path.join(directoryPath, file);
        var htmlFilePath = path.join(outputDirectoryPath, path.basename(file, '.md') + '.html');
        var htmlContent = convertFileToHTML(markdownFilePath);
        fs.writeFileSync(htmlFilePath, htmlContent);
    });
}

const mdDirectory = process.argv[2];
const htmlDirectory = process.argv[3];

convertMarkdownFilesToHTML(mdDirectory, htmlDirectory);
createIndexPage(mdDirectory, htmlDirectory);

