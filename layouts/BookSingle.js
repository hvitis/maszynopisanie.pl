import { markdownify } from '@lib/utils/textConverter';
import { shortcodes } from '@shortcodes/all';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Base from './Baseof';
import Social from './components/Social';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Container } from './components/Container';
import { dateFormat } from '@lib/utils/dateFormat';

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BookSingle = ({ frontmatter, content, mdxContent }) => {
  const { description, social, title, image, date } = frontmatter;
  let router = useRouter();
  let previousPathname = true;
  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
    >
      <Head>
        <title>{`${title} - Spencer Sharp`}</title>
        <meta name="description" content={description} />
      </Head>
      <Container className="mt-6 lg:mt-10">
        <img src={image} class="object-cover h-48 w-full rounded-md m-2 mb-10"></img>
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {title}
                </h1>
                <time
                  dateTime={date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{dateFormat(date)}</span>
                </time>
              </header>
              <div className="content mb-32 mt-16">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </Container>
    </Base>
  );
};

export default BookSingle;

// <Base
// title={title}
// description={description ? description : content.slice(0, 120)}
// >

// <section className="section">
//   <div className="container">
//     <div className="mb-4 text-center md:px-24">
//       {image && (
//         <div className="mb-8">
//           <Image
//             src={image}
//             className="rounded-lg"
//             height="150"
//             width="150"
//             alt={title}
//           />
//         </div>
//       )}
//       {markdownify(title, "h1", "h2 mb-8")}
//       <Social source={social} className="social-icons-simple" />
//       <div className="content">
//         <MDXRemote {...mdxContent} components={shortcodes} />
//       </div>
//     </div>
//   </div>
// </section>
// </Base>
