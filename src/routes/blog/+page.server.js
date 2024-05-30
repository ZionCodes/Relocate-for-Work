import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';
import { createEmail } from '$lib/server/emailHandler';


export async function load(){
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const records = await pb.collection('posts').getFullList(200 /* batch size */, {
        expand: 'field',
        sort: '-created',
    });

    const results = records.map((record) => {
        const createdDate = new Date(record.created);
        const formattedDate = createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

        const author = record.expand?.field;

        return {
            title: record.title,
            introduction: record.introduction,
            article: record.article,
            thumbnail: record.thumbnail,
            field: author,
            id: record.id,
            created: formattedDate, 
        };
    });

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