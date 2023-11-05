import Base from '@layouts/Baseof';
import { getSinglePages } from '@lib/contents';
import { getTaxonomy } from '@lib/taxonomies';
import { slugify } from '@lib/utils/textConverter';
import PostsList from '@partials/PostsList';
import siteMetadata from 'data/siteMetadata';

const { blog_folder } = siteMetadata.settings;

// tag page
const Tag = ({ tag, posts, authors }) => {
  return (
    <Base title={tag}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Posty z <span className="text-primary">{tag}</span> tag
          </h1>
          <PostsList posts={posts} authors={authors} />
        </div>
      </div>
    </Base>
  );
};

export default Tag;

// tag page routes
export const getStaticPaths = () => {
  const allCategories = getTaxonomy(`content/${blog_folder}`, 'tags');

  const paths = allCategories.map((tag) => ({
    params: {
      tag: tag,
    },
  }));

  return { paths, fallback: false };
};

// tag page data
export const getStaticProps = ({ params }) => {
  const posts = getSinglePages(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.tags.find((tag) =>
      slugify(tag).includes(params.tag)
    )
  );
  const authors = getSinglePages('content/authors');

  return {
    props: { posts: filterPosts, tag: params.tag, authors: authors },
  };
};
