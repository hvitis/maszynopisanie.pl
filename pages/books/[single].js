import Books from "@layouts/Books";
import { getSinglePages, getSinglePagesSlug } from "@lib/contents";
import { parseMDX } from "@lib/utils/mdxParser";

// post single layout
const Article = ({ book, mdxContent }) => {
  const { frontmatter, content } = book[0];

  return (
    <Books
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug("content/books");
  const paths = allSlug.map((slug) => ({
    params: {
      single: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const getBooks = getSinglePages("content/books");
  const getAuthors = getSinglePages("content/authors");
  const book = getBooks.filter((book) => book.slug == single);
  const authors = getAuthors
  const mdxContent = await parseMDX(book[0].content);

  return {
    props: {
      book: book,
      authors: authors,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
