// /src/routes/sitemap.xml/+server.js
import * as sitemap from 'super-sitemap';

export const GET = async () => {
  return await sitemap.response({
    origin: 'http://relocateforwork.com',
  });
};