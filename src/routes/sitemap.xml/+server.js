// /src/routes/sitemap.xml/+server.js
import PocketBase from 'pocketbase';
import * as sitemap from 'super-sitemap';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';


const pb = new PocketBase("http://127.0.0.1:8090/");

export const prerender = true; // optional

export const GET = async () => {
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

  let jobSlugs, blogSlugs;
  try {
    // Fetch data for jobs
    const jobs = await pb.collection('jobs').getFullList();
    jobSlugs = jobs.map(record => {
      const titleSlug = record.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      const companySlug = record.companyname.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      const citySlug = record.city.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      return `${encodeURIComponent(titleSlug)}-${encodeURIComponent(companySlug)}-${encodeURIComponent(citySlug)}-${record.id}`;
    });

    // Fetch data for blog posts
    const posts = await pb.collection('posts').getFullList();
    blogSlugs = posts.map(record => {
      const titleSlug = record.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      return `${encodeURIComponent(titleSlug)}-${record.id}`;
    });
  } catch (err) {
    throw err(500, 'Could not load data for param values.');
  }

  return await sitemap.response({
    origin: 'https://relocateforwork.com',
    excludePatterns: [
      '^/blog/new', // i.e. routes starting with `/dashboard`
    ],
    paramValues: {
      '/jobs/[slug]': jobSlugs, // Job slugs
      '/blog/[slug]': blogSlugs, // Blog slugs
    },
    headers: {
      'custom-header': 'foo', // case insensitive; xml content type & 1h CDN cache by default
    },
    additionalPaths: [
      '/foo.pdf', // e.g. to a file in your static dir
    ],
    changefreq: 'daily', // excluded by default b/c ignored by modern search engines
    priority: 0.7, // excluded by default b/c ignored by modern search engines
    sort: 'alpha', // default is false; 'alpha' sorts all paths alphabetically.
  });
};
