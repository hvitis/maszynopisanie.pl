import { dateFormat } from '@lib/utils/dateFormat';
import { similerItems } from '@lib/utils/similarItems';
import { humanize, markdownify, slugify } from '@lib/utils/textConverter';
import Image from 'next/image';
import Link from 'next/link';

const BookList = ({ books, authors }) => {
  console.log('Book Authors', authors);

  let mainAuthor = authors[0];

  return (
    <div className="row justify-center">
      <div className="relative px-4 pt-2 pb-20 sm:px-6 lg:px-8 lg:pt-4 lg:pb-28">
        <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {books.map((book, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={book.frontmatter.image}
                  alt={book.frontmatter.image}
                  width={192}
                  height={192}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6 text-left">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a>{book.frontmatter.title}</a>
                  </p>
                  <Link
                    href={`/books/${book.slug}`}
                    passHref
                    className="mt-2 block"
                  >
                    <p className="text-xl font-semibold text-gray-900">
                      {book.frontmatter.title}
                    </p>
                  </Link>
                  <p className="mt-3 text-base text-gray-500">
                    {book.frontmatter.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      href={`/authors/${slugify(mainAuthor.frontmatter.title)}`}
                      key={`author-${i}`}
                      passHref
                    >
                      <span className="sr-only">
                        {mainAuthor.frontmatter.title}
                      </span>
                    </Link>
                    <Link
                      href={`/authors/${slugify(mainAuthor.frontmatter.title)}`}
                      key={`author-${i}`}
                      passHref
                    >
                      <img
                        className="h-10 w-10 rounded-full"
                        src={mainAuthor.frontmatter.image}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a
                        href={book.frontmatter.authors.title}
                        className="hover:underline"
                      >
                        {book.frontmatter.authors.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={book.frontmatter.date}>
                        {dateFormat(book.frontmatter.date)}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{book.frontmatter.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
