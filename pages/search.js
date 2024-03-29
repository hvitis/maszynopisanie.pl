import Base from '@layouts/Baseof';
import PostsList from '@layouts/partials/PostsList';
import { getSinglePages } from '@lib/contents';
import { slugify } from '@lib/utils/textConverter';
import { useSearchContext } from 'context/state';
import { useRouter } from 'next/router';

const SearchPage = ({ authors }) => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key);
  const { posts } = useSearchContext();

  const searchResults = posts.filter((product) => {
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (
      product.frontmatter.tags.find((tag) =>
        slugify(tag).includes(keyword)
      )
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  return (
    <Base title={`Search results for ${query.key}`}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Search results for{' '}
            <span className="text-primary">{query.key}</span>
          </h1>
          {searchResults.length > 0 ? (
            <PostsList posts={searchResults} authors={authors} />
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              No Search Found
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default SearchPage;

// get authors data
export const getStaticProps = () => {
  const authors = getSinglePages('content/authors');
  return {
    props: {
      authors: authors,
    },
  };
};
