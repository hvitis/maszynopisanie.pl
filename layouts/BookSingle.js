import Image from 'next/image';
import Base from './Baseof';

import { useRouter } from 'next/router';

import Link from 'next/link';
import clsx from 'clsx';
import Head from 'next/head';

import { Container } from '@components/Container';
import { Button } from '@components/Button';
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';

import { shortcodes } from '@shortcodes/all';
import { MDXRemote } from 'next-mdx-remote';

import AmazonLogo from 'public/images/logos/Amazon_logo.svg';
import OlxLogo from 'public/images/logos/Olx_logo.svg';
import AllegroLogo from 'public/images/logos/Allegro_logo.svg';

import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  ArrowDownIcon,
} from '@components/SocialIcons';

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props} passHref>
      <a target="_blank" rel="noopener noreferrer">
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>
    </Link>
  );
}

function prepareAmazonLink(title) {
  // Example link structure:
  // https://www.amazon.pl/s?k=typewriter+revolution

  return `https://www.amazon.pl/s?k=${title.replace(/ /g, '+')}`;
}

function prepareAllegroLink(title) {
  // Example link structure:
  // https://allegro.pl/listing?string=nowa%20ksiazka

  return `https://allegro.pl/listing?string=${title.replace(/ /g, '%20')}`;
}

function prepareOlxLink(title) {
  // Example link structure:
  // https://www.olx.pl/d/oferty/q-maszyna-do-pisania/

  return `https://www.olx.pl/d/oferty/q-${title.replace(/ /g, '-')}/`;
}

//TODO: Simplify link generation into one function.

function BuyingOptions({ title, ...props }) {
  let links = [
    {
      name: 'Amazon',
      logo: <AmazonLogo />,
      url: prepareAmazonLink(title),
      // price : TODO: How to get the price for them?
    },
    {
      name: 'Allegro',
      logo: <AllegroLogo />,
      url: prepareAllegroLink(title),
    },
    {
      name: 'Olx',
      logo: <OlxLogo className="rounded-full" />,
      url: prepareOlxLink(title),
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <ShoppingBagIcon className="h-6 w-6 flex-none text-gray-400" />
        <span className="ml-3">Kup Egzemplarz </span>
      </h2>
      <ol className="mt-6 space-y-4">
        {links.map((linkObj, linkObjIndex) => (
          <li key={linkObjIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {linkObj.logo}
            </div>
            <dl className="first-letter: my-auto flex flex-auto flex-wrap  gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <Link href={linkObj.url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    {linkObj.name}
                  </a>
                </Link>
              </dd>
              {/* <dt className="sr-only">linkObj</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {linkObj.name}
              </dd> */}
              {/* <dt className="sr-only">Cena</dt>
              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                22$
              </dd> */}
            </dl>
          </li>
        ))}
      </ol>
      {/* <Button variant="secondary" className="group mt-6 w-full">
        Więcej
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  );
}

const BookCollagePhotos = ({ image, ...props }) => {
  let rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];
  let [baseImgUrl, imgIndex] = image.split('--');
  let [_, imgExtension] = imgIndex.split('.');
  let name = baseImgUrl.split('-');
  let altName = `Zdjęcie książki ${name.join(' ')}`;

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[index % rotations.length]
            )}
          >
            <Image
              src={`${baseImgUrl}--${index}.${imgExtension}`}
              alt={altName}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              layout="fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BookSingle = ({ frontmatter, content, mdxContent }) => {
  const {
    description,
    social,
    title,
    image,
    date,
    bookAuthor,
    bookAuthorSocial,
  } = frontmatter;

  let router = useRouter();
  let previousPathname = true;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
    >
      <>
        <Head>
          <title>{title} - Recenzja Książki</title>
          <meta
            name="description"
            content={
              description
                ? description.slice(0, 120)
                : description.slice(0, 120)
            }
          />
        </Head>
        <Container className="mt-9">
          <div className="max-w-2xl">
            <h1 className="flex text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {previousPathname && (
                <button
                  type="button"
                  onClick={() => router.back()}
                  aria-label="Go back to articles"
                  className="group mr-3 mb-8 flex h-10 w-14 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 lg:w-10 xl:-top-1.5 xl:left-0 xl:mt-0"
                >
                  <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                </button>
              )}
              {title}
            </h1>
            <p className="mt-6 px-5 text-base text-zinc-600 dark:text-zinc-400 lg:px-1">
              {description}
            </p>
            <h3 className="mt-1 mb-3 px-5 text-right font-mono text-base font-bold text-red-500 lg:px-1">
              {bookAuthor}
            </h3>

            {bookAuthorSocial ? (
              <div className="mt-5 flex justify-end gap-6 px-5 lg:gap-4 lg:px-1">
                <span className="font-mono text-sm font-bold">
                  Poznaj Autora:{' '}
                </span>
                {bookAuthorSocial.twitter ? (
                  <SocialLink
                    href={bookAuthorSocial.twitter}
                    aria-label="Follow on Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={TwitterIcon}
                  />
                ) : null}

                {bookAuthorSocial.instagram ? (
                  <SocialLink
                    href={bookAuthorSocial.instagram}
                    aria-label="Follow on instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={InstagramIcon}
                  />
                ) : null}

                {bookAuthorSocial.github ? (
                  <SocialLink
                    href={bookAuthorSocial.github}
                    aria-label="Follow on github"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={GitHubIcon}
                  />
                ) : null}

                {bookAuthorSocial.linkedin ? (
                  <SocialLink
                    href={bookAuthorSocial.linkedin}
                    aria-label="Follow on linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={LinkedInIcon}
                  />
                ) : null}

                {bookAuthorSocial.website ? (
                  Array.isArray(bookAuthorSocial.website) ? (
                    bookAuthorSocial.website.map((link) => {
                      return (
                        <SocialLink
                          href={link}
                          aria-label="Follow on website"
                          target="_blank"
                          rel="noopener noreferrer"
                          icon={GlobeAltIcon}
                        />
                      );
                    })
                  ) : (
                    <SocialLink
                      href={bookAuthorSocial.website}
                      aria-label="Follow on website"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={GlobeAltIcon}
                    />
                  )
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
        <BookCollagePhotos image={image} />
        <Container className="mt-16 md:mt-28">
          <div className="mx-auto max-w-xl grid-cols-8 gap-2 gap-y-20 lg:grid lg:max-w-none">
            <div class="col-start-2 col-end-7 p-2 pt-2 indent-8 lg:pb-28">
              {' '}
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
            <div class="col-span-3 col-end-10">
              <div className="space-y-10">
                <BuyingOptions title={title} />
              </div>
            </div>
          </div>
        </Container>
      </>
    </Base>
  );
};

export default BookSingle;
