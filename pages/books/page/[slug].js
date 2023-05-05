import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import BookList from "@layouts/partials/BookList";
import { getListPage, getSinglePages, getSinglePagesSlug } from "@lib/contents";
import { parseMDX } from "@lib/utils/mdxParser";

// blog pagination
const BookPagination = ({
  bookIndex,
  books,
  currentPage,
  pagination,
  authors,
}) => {
  const indexOfLastBook = currentPage * pagination;
  const indexOfFirstBook = indexOfLastBook - pagination;
  const totalPages = Math.round(books.length / pagination);
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const allAuthors = authors;
  const { frontmatter, content } = bookIndex;
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container text-center">
          <BookList books={currentBooks} authors={allAuthors}/>
          <Pagination
            section="books"
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BookPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug("content/books");
  const { pagination } = config.settings;
  const totalPages = Math.round(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const books = getSinglePages("content/books");
  const authors = getSinglePages("content/authors");

  const bookIndex = await getListPage("content/books");
  const mdxContent = await parseMDX(bookIndex.content);

  return {
    props: {
      pagination: pagination,
      books: books,
      currentPage: currentPage,
      bookIndex: bookIndex,
      mdxContent: mdxContent,
      authors: authors,
    },
  };
};
