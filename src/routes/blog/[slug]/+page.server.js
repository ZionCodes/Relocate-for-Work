import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export const prerender = true;

export async function load({ params }) {
  const title = decodeURIComponent(params.slug.replace(/-/g, ' '));
  const pb = new PocketBase('https://connected-animal.pockethost.io/');
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

  // Fetch the job record using explicit ID (slug)
  const records = await pb.collection('posts').getFirstListItem(`title="${title}"`);
  // Fetch the blog post using the decoded title
  return {
    records
  };
}


export const actions={
  createmail: async ({request})=>{
      const pb = new PocketBase("https://connected-animal.pockethost.io/");
       await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
       
      const form = await request.formData();
      const email = form.get('email');

      const data = {
          email,
      };

      await pb.collection('emails').create(data);
      return { message: 'Email submitted successfully!' };
  }
}
