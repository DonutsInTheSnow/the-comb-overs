import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  sizes: string[];
  stripe_price_id: string;
  quantity: number;
  selectedSize: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { cartItems, userId } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty cart' }, { status: 400 });
    }

    const lineItems = cartItems.map((item: CartItem) => ({
      price: item.stripe_price_id,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      metadata: { userId },
    });

    await supabaseAdmin.from('orders').insert({
      user_id: userId,
      total_amount: cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0),
      status: 'pending',
      items: cartItems,
      stripe_session_id: session.id, // Add session ID
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}