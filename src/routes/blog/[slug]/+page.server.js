import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { createEmail } from '$lib/server/EmailHandler';

export async function load({ params }) {
  const id = extractIdFromSlug(params.slug);

  const pb = new PocketBase('https://connected-animal.pockethost.io/');
  try {
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    console.log('Authentication successful');

    // Fetch the post record using the extracted ID
    const record = await pb.collection('posts').getOne(id, { expand: 'field' });

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
      author,
      id: record.id,
      created: formattedDate,
    };

    return {
      records: result,
    };
  } catch (error) {
    console.error('Error fetching post:', error); // Detailed error logging
    throw new Error('Post not found');
  }
}

function extractIdFromSlug(slug) {
  const decodedSlug = decodeURIComponent(slug);

  const parts = decodedSlug.split('-');
  const id = parts.pop().trim();

  return id;
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


