import Base from '@layouts/Baseof';
import { getSinglePages } from '@lib/contents';
import { getTaxonomy } from '@lib/taxonomies';
import { slugify } from '@lib/utils/textConverter';
import PostsList from '@partials/PostsList';
import siteMetadata from 'data/siteMetadata';
const { blog_folder } = siteMetadata.settings;

// category page
const Category = ({ category, posts, authors }) => {
  return (
    <Base title={category}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Posty z kategorii{' '}
            <span className="text-primary">{category}</span>{' '}
          </h1>
          <PostsList posts={posts} authors={authors} />
        </div>
      </div>
    </Base>
  );
};

export default Category;

// category page routes
export const getStaticPaths = () => {
  const allCategories = getTaxonomy(
    `content/${blog_folder}`,
    'categories'
  );

  const paths = allCategories.map((category) => ({
    params: {
      category: category,
    },
  }));

  return { paths, fallback: false };
};

// category page data
export const getStaticProps = ({ params }) => {
  const posts = getSinglePages(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.categories.find((category) =>
      slugify(category).includes(params.category)
    )
  );
  const authors = getSinglePages('content/authors');

  return {
    props: {
      posts: filterPosts,
      category: params.category,
      authors: authors,
    },
  };
};
