import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';



export const actions={
    create: async ({request})=>{
        const pb = new PocketBase("https://connected-animal.pockethost.io/")
         await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
         
        const form = await request.formData();

        const title = form.get('title')?? '';
        const introduction = form.get('introduction')??'';
        const article = form.get('article')??'';
        const thumbnail = form.get('thumbnail')??'';      

        const data = {
            title,
            introduction,
            article,
            thumbnail
        };
        await pb.collection('posts').create(data);
    }
}