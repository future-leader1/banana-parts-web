import { config } from 'config';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
          rel="stylesheet"
          type="text/css"
        />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.kakaoKey}`}
        ></script>
      </Head>
      <body id="app">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
