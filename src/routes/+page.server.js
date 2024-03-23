import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';


export async function load(){
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const records = await pb.collection('jobs').getFullList(200 /* batch size */, {
        sort: '-created',
    });

    const results = records.map((record)=> {return {title:record.title,tag:record.tag, description:record.description, picture:record.picture, companyname:record.company_name, city:record.city, country:record.country, id:record.id, filename:record.fileName, url:record.url}})

    return{
        records: results
    }
}

