import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { config } from 'config';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from 'src/components/Modal/Modal';
import { MainMeta, MetaTagKeys } from 'src/constants/seo';
import { LanguageType } from 'src/locale/constant';
type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps<{ dehydratedState: unknown }> & {
  Component: Page<{ dehydratedState: unknown }>;
};

function MyApp({ Component, pageProps }: Props) {
  const { asPath } = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  const canonicalUrl = (
    `https://banana.parts` + (asPath === '/' ? '' : asPath)
  ).split('?')[0];
  const {
    i18n: { language },
  } = useTranslation('translation', {
    keyPrefix: 'constants_seo',
  });
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col">
        <Head>
          <script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-TFFLF6D');
            `,
            }}
          />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="google-adsense-account"
            content="ca-pub-8018403395067914"
          ></meta>
          <meta name="theme-color" content="#000000" />
          <title>
            {MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.TITLE]}
          </title>

          <meta
            key={MetaTagKeys.OG_TITLE}
            name={MetaTagKeys.OG_TITLE}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_TITLE]
            }
          />
          <meta
            key={MetaTagKeys.DESCRIPTION}
            name={MetaTagKeys.DESCRIPTION}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.DESCRIPTION]
            }
          />
          <meta
            key={MetaTagKeys.OG_DESC}
            name={MetaTagKeys.OG_DESC}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_DESC]
            }
          />
          <meta
            key={MetaTagKeys.OG_TYPE}
            name={MetaTagKeys.OG_TYPE}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_TYPE]
            }
          />
          <meta
            key={MetaTagKeys.OG_SITE_NAME}
            name={MetaTagKeys.OG_SITE_NAME}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_SITE_NAME]
            }
          />
          <meta
            key={MetaTagKeys.OG_SITE_NAME}
            name={MetaTagKeys.OG_SITE_NAME}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_SITE_NAME]
            }
          />
          <meta
            key={MetaTagKeys.OG_IMG}
            name={MetaTagKeys.OG_IMG}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.OG_IMG]
            }
          />
          <meta
            name="naver-site-verification"
            content="08f7c79353479ca9b87a50c99e2ec4cbb795f6d6"
          />
          <meta
            name="google-site-verification"
            content="B3OvxKnECSrusAabYJm2vrWzapGT_CcQDYo0MCc6DG0"
          />
          <meta
            name={MetaTagKeys.KEYWORDS}
            content={
              MainMeta &&
              language &&
              MainMeta[language as LanguageType][MetaTagKeys.KEYWORDS]
            }
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Script
          src={`https://www.googletagmanager.com/ns.html?id=${config.gaTrackingId}`}
        />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
        </QueryClientProvider>
      </div>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        limit={1}
        onClick={() => toast.clearWaitingQueue()}
      />
      <Modal />
    </>
  );
}

export default MyApp;
