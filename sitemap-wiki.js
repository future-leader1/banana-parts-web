const fs = require('fs');
const axios = require('axios');
const prettier = require('prettier');

const getDate = new Date().toISOString().slice(0, 10);
const DOMAIN = 'https://banana.parts';
const API_URL = 'https://api.banana.parts';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  try {
    const response = await axios.get(`${API_URL}/wikis/categories`);
    const data = response.data;

    if (data && Array.isArray(data) && data.length > 0) {
      const sitemapEntries = data
        .map((category) => {
          return category.wikiList
            .map((wiki) => {
              return `
            <url>
                <loc>${DOMAIN}/wiki/${wiki.id}</loc>
                <lastmod>${getDate}</lastmod>
            </url>`;
            })
            .join('');
        })
        .join('');

      const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemapEntries}
        </urlset>`;

      const formattedSitemap = formatted(generatedSitemap);

      fs.writeFileSync('./public/sitemap-wikis.xml', formattedSitemap, 'utf8');
    } else {
      console.error('No data found.');
    }
  } catch (e) {
    console.error(e);
  }
})();
