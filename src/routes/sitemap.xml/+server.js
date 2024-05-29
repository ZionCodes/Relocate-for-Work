// // /src/routes/sitemap.xml/+server.js
// import * as sitemap from 'super-sitemap';

// export const GET = async () => {
//   return await sitemap.response({
//     origin: 'http://relocateforwork.com',
//   });
// };

import * as sitemap from 'super-sitemap';

export const GET = async () => {
  const sitemapResponse = await sitemap.response({
    origin: 'http://relocateforwork.com',
  });

  console.log(sitemapResponse);

  return sitemapResponse;
};
