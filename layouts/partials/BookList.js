import { dateFormat } from '@lib/utils/dateFormat';
import { similerItems } from '@lib/utils/similarItems';
import { humanize, markdownify, slugify } from '@lib/utils/textConverter';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const BookList = ({ books, authors }) => {
  let mainAuthor = authors[0];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-xl px-4 pb-4 sm:px-6 sm:pb-4 lg:max-w-7xl lg:px-8">
        <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {books.map((book, i) => (
            <div
              key={i}
              href={`/books/${book.slug}`}
              className="group block text-right"
            >
              <div
                aria-hidden="true"
                className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg group-hover:opacity-90 lg:aspect-w-5 lg:aspect-h-6"
              >
                <Link href={`/books/${book.slug}`} passHref>
                  <a>
                    <img
                      src={book.frontmatter.image}
                      alt={book.frontmatter.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </a>
                </Link>
              </div>
              <h3 className="mt-4 text-left font-mono text-base font-bold text-gray-900">
                {book.frontmatter.title}.
              </h3>
              <h3 className="mt-1 mb-3 font-mono text-base font-bold text-red-500">
                {book.frontmatter.bookAuthor}
              </h3>
              <p className="text- mt-2 text-left text-gray-500">
                {book.frontmatter.description.split(0, 50)}...
              </p>

              <a
                href={`/books/${book.slug}`}
                className="pointer-events-auto font-mono text-sm font-medium underline underline-offset-8 hover:font-bold"
              >
                czytaj dalej
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
