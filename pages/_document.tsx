import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="google-site-verification" content="AByyjgspGOVnEQSxTYO7SUBa2Af93DGcOaqthjhoDR8" />
      <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
      <link href="/static/favicons/site.webmanifest" rel="manifest" />
      <link rel="icon" href="/static/favicons/favicon.ico"/>
      <link rel="shortcut icon" sizes="196x196" href="/static/favicons/android-chrome-192x192.png"/>
      <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/static/favicons/favicon-144x144.png" rel="icon" sizes="144x144" type="image/png" />
      <link href="/static/favicons/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/static/favicons/favicon-48x48.png" rel="icon" sizes="48x48" type="image/png" />
      <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#ffffff" name="theme-color" />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="/static/favicons/browserconfig.xml" name="msapplication-config" />
      <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />
      <meta />
      </Head>
      <body className='bg-gray-50 dark:bg-[#131415] text-white dark:text-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
