# 정적 sitemap 생성
echo "정적 sitemap 생성중.."
node ./sitemap-common.js
echo "정적 sitemap 생성 완료!"

# 동적 sitemap 생성
echo "동적 sitemap 조회 및 생성중.."
node ./sitemap-product.js 
node ./sitemap-dealer.js 
node ./sitemap-wiki.js 
echo "동적 sitemap 생성 완료!"

# sitemap index 파일 생성
node ./sitemap.js