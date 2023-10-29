const fs = require('fs');
const path = require('path');

const prettier = require('prettier');

const getDate = new Date().toISOString().slice(0, 10);
const DOMAIN = 'https://banana.parts';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

const readTsxFiles = async (directory) => {
  const files = await fs.promises.readdir(directory, { withFileTypes: true });
  const tsxFiles = [];

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      const subDirectoryTsxFiles = await readTsxFiles(fullPath);
      tsxFiles.push(...subDirectoryTsxFiles);
    } else if (path.extname(file.name) === '.tsx') {
      const relativePath = path.relative(
        path.join(__dirname, 'pages'),
        fullPath
      );
      const urlPath = relativePath
        .replace(/\\/g, '/')
        .replace(/\.tsx$/, '')
        .replace('/index', '');
      tsxFiles.push(urlPath);
    }
  }

  return tsxFiles;
};

async function getPages() {
  const directoryPath = path.join(__dirname, 'pages');
  const tsxFiles = await readTsxFiles(directoryPath);
  const pages = tsxFiles.filter(
    (file) =>
      !file.includes('[id]') &&
      !file.includes('admin') &&
      !file.includes('mypage/') &&
      !file.includes('seller/') &&
      !file.includes('_app') &&
      !file.includes('_document') &&
      !file.includes('pdf') &&
      !file.includes('eng') &&
      !file.includes('writer/') &&
      file
  );

  const pagesSitemap = `${pages
    .map((page) => {
      const path = page
        .replace('../pages/', '')
        .replace('.tsx', '')
        .replace(/\/index/g, '');
      const routePath = path === 'index' ? '' : path;
      return `
    <url>
        <loc>${DOMAIN}/${routePath}</loc>
        <lastmod>${getDate}</lastmod>
    </url>`;
    })
    .join('')}`;

  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  >
      ${pagesSitemap}
  </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync('./public/sitemap-common.xml', formattedSitemap, 'utf8');
}
getPages();
