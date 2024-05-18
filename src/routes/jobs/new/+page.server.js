import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import PocketBase from 'pocketbase';
import {SECRET_EMAIL,SECRET_PASSWORD,STRIPE_SECRET_KEY} from '$env/static/private';



const stripe = new Stripe(STRIPE_SECRET_KEY);

export const actions={
    create: async ({request})=>{
        const pb = new PocketBase("https://connected-animal.pockethost.io/")
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
        const description = form.get('description')??'';        


        const data = {
            title,
            tag,
            picture,
            company_name,
            city,
            country,
            url,
            email,
            description
        };

        await pb.collection('jobs').create(data);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Job Posting Fee',
                            description,
                        },
                        unit_amount: 9900, // Amount in cents ($99.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.origin}/?success=true`,
            cancel_url: `${request.headers.origin}/?canceled=true`,
            customer_email: email,
        });

        return json({ id: session.id });

        


    }
}




  