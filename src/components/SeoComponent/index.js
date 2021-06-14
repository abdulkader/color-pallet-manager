import Proptypes from 'prop-types';
import Head from 'next/head';

const SeoComponent = ({ data }) => {
  return (
    <Head>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description || ''} />
      <meta name="keywords" content={data?.keywords || ''} />
      {/* Manifest Related Tags */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <meta
        key="mobile-web-app-capable"
        name="mobile-web-app-capable"
        content="yes"
      />
      <meta
        key="apple-mobile-web-app-capable"
        name="apple-mobile-web-app-capable"
        content="yes"
      />
      <meta
        key="application-name"
        name="application-name"
        content="Grocery App"
      />
      <meta
        key="apple-mobile-web-app-title"
        name="apple-mobile-web-app-title"
        content="Grocery App"
      />
      <meta key="theme-color" name="theme-color" content="#fff" />
      <meta
        key="msapplication-navbutton-color"
        name="msapplication-navbutton-color"
        content="#fff"
      />
      <meta
        key="apple-mobile-web-app-status-bar-style"
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        key="msapplication-starturl"
        name="msapplication-starturl"
        content="/"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        key="format-detection"
        name="format-detection"
        content="telephone=no"
      />
      {/* Open Graph Tags */}
      <meta
        key="og_title"
        property="og:title"
        content={data?.og_title || data?.title}
      />
      <meta
        key="og_type"
        property="og:type"
        content={data?.type || 'product'}
      />
      <meta key="og_url" property="og:url" content={data?.url} />
      <meta
        key="og_description"
        property="og:description"
        content={data?.og_description || data?.description || ''}
      />
    </Head>
  );
};

SeoComponent.propTypes = {
  data: Proptypes.object.isRequired,
};

export default SeoComponent;
