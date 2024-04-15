import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function load({ params }) {
  const id = extractIdFromSlug(params.slug);
  const pb = new PocketBase('http://127.0.0.1:8090');
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

export const actions={
  createmail: async ({request})=>{
      const pb = new PocketBase("http://127.0.0.1:8090");
      //sign in
       await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
       
      const form = await request.formData();

      const email = form.get('email')?? '';     


      const data = {
          email,
         
      };

      
      
      await pb.collection('emails').create(data);


  }
}
