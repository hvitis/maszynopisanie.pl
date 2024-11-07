import siteMetadata from 'data/siteMetadata';
import Image from 'next/image';
import Link from 'next/link';
import {
  humanize,
  markdownify,
  slugify,
} from '@lib/utils/textConverter';

const Author = ({ author }) => {
  console.log(author);
  return (
    <Link
      className=""
      href={`/authors/${slugify(author.frontmatter.title)}`}
      passHref
    >
      <a className="ml-2 inline-block hover:text-primary">
        {author.frontmatter.image && (
          <span className="author-image">
            <Image
              src={author.frontmatter.image}
              alt={author.frontmatter.title}
              height={90}
              width={90}
            />
          </span>
        )}
        <span>{author.frontmatter.title}</span>
      </a>
    </Link>
  );
};

export default Author;
