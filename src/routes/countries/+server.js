import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export async function GET() {
    const pb = new PocketBase("https://connected-animal.pockethost.io/");
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    const countries = await pb.collection('countries').getFullList(200);

    return new Response(JSON.stringify(countries), {
        headers: { 'Content-Type': 'application/json' }
    });
}
