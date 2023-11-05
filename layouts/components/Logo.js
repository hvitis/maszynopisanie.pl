import siteMetadata from 'data/siteMetadata';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  const { logo, logo_width, logo_height, logo_text } =
    siteMetadata.settings;

  return (
    <Link href={siteMetadata.baseUrl} passHref>
      <a
        className="navbar-brand block"
        style={{
          height: logo_height.replace('px', '') + 'px',
          width: logo_width.replace('px', '') + 'px',
        }}
      >
        {logo ? (
          <Image
            width={logo_width.replace('px', '') * 2}
            height={logo_height.replace('px', '') * 2}
            src={logo}
            alt={logo_text}
            priority
          />
        ) : (
          logo_text
        )}
      </a>
    </Link>
  );
};

export default Logo;
