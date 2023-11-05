import { markdownify } from '@lib/utils/textConverter';
import { shortcodes } from '@shortcodes/all';
import { MDXRemote } from 'next-mdx-remote';
// import Image from 'next/image';
import Base from './Baseof';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import { Container } from './components/Container';
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from './components/SocialIcons';

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      </Link>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

const AuthorSingle = ({ frontmatter, content, mdxContent }) => {
  const { title, image, description, social } = frontmatter;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
    >
      <>
        <Head>
          <title>O mnie - {title}</title>
          <meta
            name="description"
            content={
              description
                ? description.slice(0, 120)
                : description.slice(0, 120)
            }
          />
        </Head>
        <Container className="mt-16 mb-32 sm:mt-32">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
            <div className="lg:pl-20">
              <div className="max-w-xs px-2.5 lg:max-w-none">
                <Image
                  src={image}
                  width={400}
                  height={400}
                  alt="Autor bloga"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                />
              </div>
            </div>
            <div className="lg:order-first lg:row-span-2">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800  sm:text-5xl">
                {title}
              </h1>
              <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </div>
            {social ? (
              <div className="lg:pl-20">
                <ul role="list">
                  <SocialLink
                    href={social.twitter}
                    icon={TwitterIcon}
                  >
                    Follow on Twitter
                  </SocialLink>
                  <SocialLink
                    href={social.instagram}
                    icon={InstagramIcon}
                    className="mt-4"
                  >
                    Follow on Instagram
                  </SocialLink>
                  <SocialLink
                    href={social.github}
                    icon={GitHubIcon}
                    className="mt-4"
                  >
                    Follow on GitHub
                  </SocialLink>
                  <SocialLink
                    href={social.linkedin}
                    icon={LinkedInIcon}
                    className="mt-4"
                  >
                    Follow on LinkedIn
                  </SocialLink>
                  <SocialLink
                    href="mailto:spencer@planetaria.tech"
                    icon={MailIcon}
                    className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                  >
                    spencer@planetaria.tech
                  </SocialLink>
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </>
    </Base>
  );
};

export default AuthorSingle;
