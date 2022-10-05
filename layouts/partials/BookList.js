import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const BookList = ({ books }) => {
  return (
    <div className="row justify-center">
      {books.map((book, i) => (
        <div className="col-12 mb-8 sm:col-6 md:col-4" key={`key-${i}`}>
          {book.frontmatter.image && (
            <div className="mb-4">
              <Image
                src={book.frontmatter.image}
                alt={book.frontmatter.title}
                height="150px"
                width="150px"
                layout="fixed"
                className="rounded-lg"
              />
            </div>
          )}
          <h3 className="h4 mb-2">
            <Link href={`/books/${book.slug}`} passHref>
              <a className="block hover:text-primary">
                {book.frontmatter.title}
              </a>
            </Link>
          </h3>
          {markdownify(book.content.slice(0, 120), "p")}
        </div>
      ))}
    </div>
  );
};

export default BookList;
