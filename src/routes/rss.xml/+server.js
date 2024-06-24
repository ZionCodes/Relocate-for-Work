import PocketBase from 'pocketbase';
import { create } from 'xmlbuilder2';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function GET() {
  const pb = new PocketBase("https://connected-animal.pockethost.io/");
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
  const records = await pb.collection('jobs').getFullList(200 /* batch size */, {
    sort: '-created',
  });

  const url = "https://relocateforwork.com";
  const feed = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('rss', {
      'xmlns:dc': 'https://purl.org/dc/elements/1.1/',
      'xmlns:content': 'https://purl.org/rss/1.0/modules/content/',
      'xmlns:atom': 'https://www.w3.org/2005/Atom',
      version: '2.0'
    })
    .ele('channel')
      .ele('title').txt('Find Visa Sponsorship and Relocation Support Jobs | Relocate for Work').up()
      .ele('link').txt(url).up()
      .ele('description').txt('Land your dream job and move abroad! Relocate for Work connects you with visa sponsorship and relocation support jobs.').up()
      .ele('atom:link', { href: `${url}/rss.xml`, rel: 'self', type: 'application/rss+xml' }).up();

  records.forEach(record => {
    const createdDate = new Date(record.created).toUTCString(); // Format the date
    const jobLink = `${url}/jobs/${encodeURIComponent(record.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${encodeURIComponent(record.company_name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${encodeURIComponent(record.city.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${record.id}`;
    const description = `${record.company_name} is hiring a ${record.title} to join their team in ${record.city}, ${record.country}. If that's you, consider applying!`;

    feed.ele('item')
      .ele('title').txt(record.title).up()
      .ele('link').txt(jobLink).up()
      .ele('description').txt(description).up()
      .ele('pubDate').txt(createdDate).up()
    .up();
  });

  const xml = feed.end({ prettyPrint: true });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
