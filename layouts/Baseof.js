import { plainify } from '@lib/utils/textConverter';
import Footer from '@partials/Footer';
import Header from '@partials/Header';
import siteMetadata from 'data/siteMetadata';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { imageUrl } = siteMetadata;
  const meta_author = siteMetadata.author;
  const meta_description = siteMetadata.description;
  const { baseUrl } = siteMetadata;
  const router = useRouter();

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title
              ? meta_title
              : title
              ? title
              : siteMetadata.title
          )}
        </title>

        {/* canonical url */}
        {canonical && (
          <link rel="canonical" href={canonical} itemProp="url" />
        )}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(
            description
              ? description
              : meta_description
              ? meta_description
              : siteMetadata.description
          )}
        />

        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title
              ? meta_title
              : title
              ? title
              : siteMetadata.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(
            description
              ? description
              : meta_description
              ? meta_description
              : siteMetadata.description
          )}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${baseUrl}/${router.asPath.replace('/', '')}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title
              ? meta_title
              : title
              ? title
              : siteMetadata.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(
            description
              ? description
              : meta_description
              ? meta_description
              : siteMetadata.description
          )}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${baseUrl}${image ? image : imageUrl}`}
        />

        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${baseUrl}${image ? image : imageUrl}`}
        />
        <meta
          name="twitter:card"
          content={`${
            image && !meta_title ? 'summary_large_image' : 'summary'
          }`}
        />
      </Head>
      <Header />
      {/* main site */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
