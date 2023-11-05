import Pagination from '@components/Pagination';
import Base from '@layouts/Baseof';
import { getSinglePages, getSinglePagesSlug } from '@lib/contents';
import PostsList from '@partials/PostsList';
import menu from '@config/menu.json';
import Link from 'next/link';
import siteMetadata from 'data/siteMetadata';

const { blog_folder } = siteMetadata.settings;
// blog pagination
const BlogPagination = ({
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.round(posts.length / pagination);
  const currentPosts = posts
    .slice(indexOfFirstPost, indexOfLastPost)
    .reverse();

  return (
    <Base>
      <section className="section">
        <div className="container">
          <div className="mx-auto mb-7  pr-6 ">
            <div className="mx-auto  lg:mx-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                {siteMetadata.headerTitle}
              </h1>
              <h2 className="mt-6 pl-0 text-sm font-normal leading-8 text-gray-500 lg:pl-4 lg:text-lg">
                {siteMetadata.description}
              </h2>
            </div>
            {/* <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-700 sm:grid-cols-2 md:flex lg:gap-x-10">
                {menu.main.map(
                  (link) =>
                    link.url && (
                      <a key={link.name} href={link.url}>
                        {link.name}{' '}
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    )
                )}
              </div>
            </div> */}
          </div>

          <PostsList
            className="mb-16"
            posts={currentPosts}
            authors={authors}
          />
          <Pagination
            section=""
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug(`content/${blog_folder}`);
  const { pagination } = siteMetadata.settings;
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
  const { pagination } = siteMetadata.settings;
  const posts = getSinglePages(`content/${blog_folder}`);
  const authors = getSinglePages('content/authors');

  return {
    props: {
      pagination: pagination,
      posts: posts,
      authors: authors,
      currentPage: currentPage,
    },
  };
};
