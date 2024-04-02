import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';

  



export const actions={
    create: async ({request})=>{
        const pb = new PocketBase("http://127.0.0.1:8090");
        //sign in
         await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
         
        const form = await request.formData();

        const title = form.get('title')?? '';
        const tag = form.get('tag')??'';
        const picture = form.get('logo')??'';
        const company_name = form.get('company-name')??'';
        const city = form.get('city')??'';
        const country = form.get('country')??'';
        const url = form.get('url')??'';
        const email = form.get('email')??'';
        


        const data = {
            title,
            tag,
            picture,
            company_name,
            city,
            country,
            url,
            email
        };

        
        
        await pb.collection('jobs').create(data);


    }
}


  