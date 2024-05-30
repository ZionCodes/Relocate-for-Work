import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import { createEmail } from '$lib/server/emailHandler';

export async function load({ params }) {
  const id = extractIdFromSlug(params.slug);
  const pb = new PocketBase('https://connected-animal.pockethost.io/');
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

  // Fetch the job record using explicit ID (slug)
  const records = await pb.collection('jobs').getOne(id, {
  });
  // Handle errors based on PocketBase response status code
  return {
    records
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
