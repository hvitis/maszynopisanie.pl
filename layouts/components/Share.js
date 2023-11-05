import siteMetadata from 'data/siteMetadata';
import {
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
} from 'react-icons/io5';

const Share = ({ title, description, slug, className }) => {
  const { baseUrl } = siteMetadata;

  return (
    <ul className={`${className}`}>
      <li className="inline-block">
        <a
          aria-label="facebook share button"
          href={`https://facebook.com/sharer/sharer.php?u=${baseUrl}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
        >
          <IoLogoFacebook />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="twitter share button"
          href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${baseUrl}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
        >
          <IoLogoTwitter />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="linkedin share button"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}/${slug}&title=${title}&summary=${description}&source=${baseUrl}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoLinkedin />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="pinterest share button"
          href={`https://pinterest.com/pin/create/button/?url=${baseUrl}/${slug}&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
        >
          <IoLogoPinterest />
        </a>
      </li>
    </ul>
  );
};

export default Share;
