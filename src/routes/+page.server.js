import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';


export async function load(){
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const records = await pb.collection('jobs').getFullList(200 /* batch size */, {
        sort: '-created',
    });

    const results = records.map((record) => {
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
            url: record.url,
            created: formattedDate // Use formatted date here
        };
    });

    // const results = records.map((record)=> {return {title:record.title,tag:record.tag, description:record.description, picture:record.picture, companyname:record.company_name, city:record.city, country:record.country, id:record.id, filename:record.fileName, url:record.url, created:record.created }})

    return{
        records: results
    }
}






export const actions={
    createmail: async ({request})=>{
        const pb = new PocketBase("https://connected-animal.pockethost.io/");
        //sign in
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


  
