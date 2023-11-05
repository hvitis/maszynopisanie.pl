import Social from '@components/Social';
import menu from '@config/menu.json';
import { markdownify } from '@lib/utils/textConverter';
import siteMetadata from 'data/siteMetadata';
import Link from 'next/link';

const Footer = () => {
  const { copyright } = siteMetadata;
  return (
    <footer className="section bg-dark">
      <div className="container text-center">
        {/* footer menu */}
        <ul className="mb-8 space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link href={menu.url} passHref>
                <a className="p-4 text-text-light hover:text-white">
                  {menu.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <Social
          source={siteMetadata.social}
          className="social-icons mb-8"
        />
        {/* copyright */}
        {markdownify(copyright, 'p', 'text-text-light')}
      </div>
    </footer>
  );
};

export default Footer;
