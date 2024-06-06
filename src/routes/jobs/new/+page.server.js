import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export const actions = {
    create: async ({ request }) => {
        const pb = new PocketBase("https://connected-animal.pockethost.io/");
        // Sign in
        await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);

        const form = await request.formData();
        const data = {
            title: form.get('title') ?? '',
            tag: form.get('tag') ?? '',
            picture: form.get('logo') ?? '',
            company_name: form.get('company-name') ?? '',
            city: form.get('city') ?? '',
            country: form.get('country') ?? '',
            url: form.get('url') ?? '',
            email: form.get('email') ?? '',
            description: form.get('description') ?? ''
        };

        await pb.collection('jobs').create(data);

        return {
            success: true
        };
    }
};
