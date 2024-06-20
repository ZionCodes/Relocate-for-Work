import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';
import { createEmail } from '$lib/server/EmailHandler';

export async function load(){
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const records = await pb.collection('jobs').getFullList(200 /* batch size */, {
        sort: '-created',
    });

      // Sort records
    const sortedRecords = records.sort((a, b) => {
      // Jobs with both tier_1 and tier_2
      if (a.tier_1 && a.tier_2 && (!b.tier_1 || !b.tier_2)) return -1;
      if ((!a.tier_1 || !a.tier_2) && b.tier_1 && b.tier_2) return 1;

      // Jobs with only tier_2
      if (a.tier_2 && !b.tier_2) return -1;
      if (!a.tier_2 && b.tier_2) return 1;

      // Default sort by creation date
      return new Date(b.created) - new Date(a.created);
      });

    const results = sortedRecords.map((record) => {
        const createdDate = new Date(record.created);
        const formattedDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        return {
            title: record.title,
            tag: record.tag,
            description: record.description,
            picture: record.picture,
            companyname: record.company_name,
            city: record.city,
            country: record.country,
            id: record.id,
            filename: record.fileName,
            tier_1: record.tier_1,
            tier_2: record.tier_2,
            tier_3: record.tier_3,
            url: record.url,
            created: formattedDate // Use formatted date here
        };
    });

    // const results = records.map((record)=> {return {title:record.title,tag:record.tag, description:record.description, picture:record.picture, companyname:record.company_name, city:record.city, country:record.country, id:record.id, filename:record.fileName, url:record.url, created:record.created }})

    return{
        records: results
    }
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


  
