import Link from 'next/link';

const Button = ({ href, type, rel, children, name }) => {
  return (
    <Link href={href} passHref>
      <a
        target="_blank"
        rel={`noopener noreferrer ${
          rel ? (rel === 'follow' ? '' : rel) : 'nofollow'
        }`}
        className={`font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline`}
      >
        {name} 
      </a>
    </Link>
  );
};

export default Button;
