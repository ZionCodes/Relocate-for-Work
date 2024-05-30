import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { createEmail } from '$lib/server/EmailHandler';


export async function load({ params }) {
  const id = extractIdFromSlug(params.slug);
  const pb = new PocketBase('https://connected-animal.pockethost.io/');
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

  // Fetch the job record using explicit ID (slug)
  const record = await pb.collection('posts').getOne(id, {
    expand: 'field',
  });
  if (!record) {
    throw new Error('Post not found');
  }
  const createdDate = new Date(record.created);
  const formattedDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const author = record.expand?.field;

  const result = {
    title: record.title,
    introduction: record.introduction,
    article: record.article,
    thumbnail: record.thumbnail,
    author, // Include the expanded 'author' relation
    id: record.id,
    created: formattedDate,
  };

  return {
    records: result // Return an array containing a single record
  };
}

function extractIdFromSlug(slug) {
  const parts = slug.split('-');
  return parts.pop(); 
}



export const actions = {
  createmail: async ({ request }) => {
    try {
      const result = await createEmail(request);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};