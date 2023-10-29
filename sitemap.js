const fs = require('fs');
const path = require('path');

const getDate = new Date().toISOString().slice(0, 10);

const DOMAIN = 'https://banana.parts';

(async () => {
  const folderPath = './public';
  const files = await fs.readdirSync(folderPath);
  const SITEMAPS = files.filter(
    (file) => path.extname(file).toLowerCase() === '.xml'
  );

  const pagesSitemap = `${SITEMAPS.map((path) => {
    return `
    <sitemap>
        <loc>${DOMAIN}/${path}</loc>
        <lastmod>${getDate}</lastmod>
    </sitemap>`;
  }).join('')}
  `;

  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesSitemap}
</sitemapindex>
`;

  fs.writeFileSync('./public/sitemap.xml', generatedSitemap, 'utf8');
})();
