import { json } from '@sveltejs/kit';
import stripe from './stripe.js';

export async function post({ request }) {
  const { amount } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Job Posting Fee',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${request.headers.origin}/?success=true`,
      cancel_url: `${request.headers.origin}/job/new`,
    });

    return json({ sessionId: session.id });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}
