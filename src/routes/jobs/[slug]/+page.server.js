import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';


export async function load({ params }) { // Access URL parameters
    const slug = params.slug; // Extract slug from URL (replace 'id' with 'slug')
  
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
  
    // Search for the job record based on a combination of title, company, and location
    const query = {
      filter: `title="${decodeURIComponent(slug.split('-')[0])}" AND company_name="${decodeURIComponent(slug.split('-')[1])}" AND city="${decodeURIComponent(slug.split('-')[2])}"`,
    };
    const jobRecord = await pb.collection('jobs').getFirst(query);
  
    if (!jobRecord) {
      // Handle case where job is not found (e.g., redirect to 404 page)
      return { status: 404 };
    }
  
    const job = {
      title: jobRecord.title,
      tag: jobRecord.tag,
      description: jobRecord.description,
      picture: jobRecord.picture,
      companyname: jobRecord.company_name,
      city: jobRecord.city,
      country: jobRecord.country,
      // Add other required job details
    };
  
    return { job };
  }
  