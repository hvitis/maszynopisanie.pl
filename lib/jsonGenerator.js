const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// TODO: fix importing
const blog_folder = 'posts';

// get post data
const blogPath = path.join(`content/${blog_folder}`);
const getPosts = fs.existsSync(blogPath) ? fs.readdirSync(blogPath) : [];
const filterPosts = getPosts.filter((post) => post.match(/^(?!_)/) && post.endsWith('.md'));
const posts = filterPosts.map((filename) => {
  const slug = filename.replace('.md', '');
  const postData = fs.readFileSync(
    path.join(blogPath, filename),
    'utf-8'
  );
  const { data } = matter(postData);
  const content = matter(postData).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
});

// write json file. Must need a ./json folder before writing
try {
  if (!fs.existsSync("json")) {
    fs.mkdirSync("json");
  }
  fs.writeFileSync(`json/posts.json`, JSON.stringify(posts));
} catch (err) {
  console.error(err);
}
