/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title:
    'Wszystko o maszynach do pisania - Zacznij pisać na maszynie już dziś.',
  author: 'Adam Piskorek',
  headerTitle: 'Wszystko o maszynach do pisania',
  description:
    'Olivetti, Erika, Łucznik, Hermes a może Olympia albo Underwood? Zastanawiasz się jaką i gdzie kupić? Jak działa? Tutaj znajdziesz o nich wszystko.',
  language: 'pl-PL',
  baseUrl: 'https://maszynopisani.pl',
  imageUrl: '/olivetti-maszyna-valentine.webp',
  theme: 'system', // system, dark or light
  siteUrl: 'https://maszynopisani.pl',
  siteRepo: 'https://github.com/hvitis/maszynopisani.pl',
  siteLogo: '/images/olivetti-maszyna-valentine.webp',
  socialBanner: '/images/olivetti-maszyna-valentine-small.webp',
  locale: 'pl-PL',
  copyright: 'Copyright © 2022',
  meta_author: 'maszynopisani.pl - Maszyny do Pisania',
  meta_image: '/images/favicon.png',
  meta_description:
    'Olivetti, Erika, Łucznik, Hermes a może Olympia albo Underwood? Zastanawiasz się jaką i gdzie kupić? Jak działa? Tu znajdziesz wszystko o maszynach do pisania.',
  social: {
    github: '',
    twitter: 'https://twitter.com/hvitis_',
    facebook: '',
    youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    linkedin: '',
    gitlab: '',
    medium: '',
    codepen: '',
    bitbucket: '',
    dribbble: '',
    behance: '',
    pinterest: '',
    soundcloud: '',
    tumblr: '',
    reddit: '',
    vk: '',
    whatsapp: '',
    snapchat: '',
    vimeo: '',
    tiktok: '',
    foursquare: '',
    rss: '',
    email: '',
    phone: '',
    address: '',
    skype: '',
    website: '',
  },
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_PAGE_UUID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: 'convertkit',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      // repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      // repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      // category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      // categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'pl',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    // The application ID provided by Algolia
    //   appId: '',
    // Public API key: it is safe to commit it
    //   apiKey: '',
    //   indexName: 'docsearch',
    // },
  },
  settings: {
    pagination: 7,
    summary_length: 210,
    blog_folder: 'posts',
    favicon: '/images/favicon.png',
    logo: '/images/logo.png',
    logo_width: '200',
    logo_height: '34',
    logo_text: 'maszynopisani.pl',
  },
};

module.exports = siteMetadata;
