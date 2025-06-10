import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature')!;
  const body = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Webhook event received:', event.type, 'Event ID:', event.id);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Session ID:', session.id);

      const { data, error } = await supabaseAdmin
        .from('orders')
        .update({ status: 'completed' })
        .eq('stripe_session_id', session.id)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
      } else if (data.length === 0) {
        console.log('No matching order found for session ID:', session.id);
      } else {
        console.log('Order status updated to completed for session:', session.id);
      }
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log('Charge ID:', charge.id, 'Payment Intent:', charge.payment_intent);

      const session = await stripe.checkout.sessions.list({
        payment_intent: charge.payment_intent as string,
      });

      if (session.data.length > 0) {
        const sessionId = session.data[0].id;
        console.log('Found session ID:', sessionId);

        const { data, error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'completed' })
          .eq('stripe_session_id', sessionId)
          .select();

        if (error) {
          console.error('Supabase update error:', error);
        } else if (data.length === 0) {
          console.log('No matching order found for session ID:', sessionId);
        } else {
          console.log('Order status updated to completed for session:', sessionId);
        }
      } else {
        console.log('No session found for payment intent:', charge.payment_intent);
      }
    } else {
      console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}