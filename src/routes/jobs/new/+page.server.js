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
        const description = form.get('description')??'';


        const data = {
            title,
            tag,
            description
        };

        
        
        await pb.collection('jobs').create(data);


    }
}


  