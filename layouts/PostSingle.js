import { dateFormat } from '@lib/utils/dateFormat';
import { similerItems } from '@lib/utils/similarItems';
import {
  humanize,
  markdownify,
  slugify,
} from '@lib/utils/textConverter';
import { shortcodes } from '@shortcodes/all';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import Share from './components/Share';
import SimilarPosts from './partials/SimilarPosts';
import Author from './components/Author';
import { DiscussionEmbed } from 'disqus-react';
import siteMetadata from 'data/siteMetadata';

const PostSingle = ({ post, posts, authors, slug }) => {
  console.log(post);
  const { frontmatter, content, mdxContent } = post;
  let { description, title, date, image, categories, tags } =
    frontmatter;
  description = description ? description : content.slice(0, 120);
  const similarPosts = similerItems(post, posts, slug);
  let correction = authors.filter((author) =>
    frontmatter.proofreading
      .map((author) => slugify(author))
      .includes(slugify(author.frontmatter.title))
  );

  authors = authors.filter((author) =>
    frontmatter.authors
      .map((author) => slugify(author))
      .includes(slugify(author.frontmatter.title))
  );
  return (
    <>
      <section className="section">
        <div className="container">
          <article className="text-center">
            {markdownify(title, 'h1', 'h2')}
            <ul className="mt-4 mb-8 text-text">
              <li className="mb-2 mr-4 inline-block">
                {dateFormat(date)}
              </li>
              <li className="mb-2 mr-4 inline-block">
                <ul>
                  {categories.map((category, i) => (
                    <li
                      className="inline-block"
                      key={`category-${i}`}
                    >
                      <Link
                        href={`/categories/${slugify(category)}`}
                        passHref
                      >
                        <a className="mr-3 hover:text-primary">
                          &#9635; {humanize(category)}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {image && (
              <Image
                src={image}
                height="500"
                width="1000"
                alt={title}
                layout="responsive"
                className="rounded-lg object-cover"
              />
            )}
            <div className="content mb-16 text-left">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <ul className="mr-4 mb-4 space-x-3">
                {tags.map((tag, i) => (
                  <li className="inline-block" key={`tag-${i}`}>
                    <Link href={`/tags/${slugify(tag)}`} passHref>
                      <a className="block rounded-lg bg-light px-4 py-2 font-semibold text-text-dark hover:text-primary">
                        #{humanize(tag)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <Share
                className="social-share mb-4"
                title={title}
                description={description}
                slug={slug}
              />
              <div className='my-auto'>
                <span className="mx-2"> Autor: </span>
                {authors.map((author) => {
                  return <Author author={author} />;
                })}

                {correction.length >= 1 && (
                  <span className="mx-2"> Korekta: </span>
                )}
                {correction.map((author) => {
                  return <Author author={author} />;
                })}
              </div>
            </div>
          </article>
          <div className='mt-10'>
            <DiscussionEmbed
              shortname="maszynopisanie"
              config={{
                url: `${siteMetadata.siteUrl}/${post.frontmatter.slug}`,
                identifier: `${post.frontmatter.date}`,
                title: `${post.frontmatter.title}`,
                language: 'pl_PL', //e.g. for Traditional Chinese (Taiwan)
              }}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="mb-8 text-center">Podobne posty</h2>
          <SimilarPosts posts={similarPosts.slice(0, 3)} />
        </div>
      </section>
    </>
  );
};

export default PostSingle;
