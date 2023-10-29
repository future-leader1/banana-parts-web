const fs = require('fs');
const axios = require('axios');
const prettier = require('prettier');

const getDate = new Date().toISOString().slice(0, 10);
const DOMAIN = 'https://banana.parts';
const API_URL = 'https://api.banana.parts';
const ITEMS_PER_PAGE = 10000;

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  let page = 0;
  while (true) {
    let productIds = [];
    page++;
    try {
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/products/ids?page=${page}&itemsPerPage=${ITEMS_PER_PAGE}`,
      }).then((res) => res.data);
      if (response.items.length > 0) {
        productIds = response.items;
      } else {
        break;
      }
    } catch (e) {
      console.error(e);
      break;
    }

    const customSitemap = `${productIds
      .map((id) => {
        return `
        <url>
            <loc>${DOMAIN}/product/${id}</loc>
            <lastmod>${getDate}</lastmod>
        </url>`;
      })
      .join('')}`;

    const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
        ${customSitemap}
    </urlset>
    `;

    const formattedSitemap = formatted(generatedSitemap);

    fs.writeFileSync(
      `./public/sitemap-product-${page}.xml`,
      formattedSitemap,
      'utf8'
    );
  }
})();
