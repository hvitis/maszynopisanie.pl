import config from "@config/config.json";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";
const { blog_folder } = config.settings;

// get index page data, ex: _index.md
export const getListPage = async (folder) => {
  const indexPath = fs.readdirSync(path.join(folder));
  const sanitizeIndexFile = indexPath.filter((file) => file.includes(".md"));
  const filterIndexFile = sanitizeIndexFile.filter((file) => file.match(/^_/));
  const indexData = fs.readFileSync(
    path.join(folder, filterIndexFile[0]),
    "utf-8"
  );
  const indexDataParsed = matter(indexData);
  const frontmatterString = JSON.stringify(indexDataParsed.data);
  const frontmatter = JSON.parse(frontmatterString);
  const content = indexDataParsed.content;
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePages = (folder) => {
  const filesPath = fs.readdirSync(path.join(folder));
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;

    return { frontmatter, slug, content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get default page data, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedContentPages = getSinglePages("content");
  const publishedPostsPages = getSinglePages("content/posts");
  const allPublishedPages = [...publishedContentPages, ...publishedPostsPages];
  const pageData = allPublishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get single pages slug
export const getSinglePagesSlug = (folder) => {
  const publishedPages = getSinglePages(folder);
  const slugs = publishedPages.map((page) => page.slug);
  return slugs;
};

// slug for reguler page
export const getRegularPageSlug = () => {
  const regularPage = getSinglePages("content");
  const postsFile = getSinglePages(`content/${blog_folder}`);
  const allFiles = [...regularPage, ...postsFile];
  const slug = allFiles.map((page) => page.slug);
  return slug;
};
