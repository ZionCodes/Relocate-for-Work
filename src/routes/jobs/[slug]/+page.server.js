import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function load({ params }) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

  // Fetch the job record using explicit ID (slug)
  const records = await pb.collection('jobs').getOne(params.slug, {
    // Optional: Specify fields to fetch for optimization (if needed)
    // fields: 'title,companyname,city,country,description', // Example

    // Optional: Expand related fields if necessary
    // expand: 'relFieldName', // Example
  });

  // Handle errors based on PocketBase response status code
  console.log(records)
  return {
    records
  };
}
