import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export const actions={
  createmail: async ({request})=>{
      const pb = new PocketBase("https://connected-animal.pockethost.io/");
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
