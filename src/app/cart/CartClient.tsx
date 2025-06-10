'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartClient() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, userId: 'guest' }),
      });
      const { url } = await response.json();
      const stripe = await stripePromise;
      if (stripe && url) {
        window.location.href = url;
      } else {
        throw new Error('Stripe session URL not found');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto bg-black mt-16 mb-52 md:mt-[120px] xl:mt-[100px]">
      <h1 className="text-[42px] font-bold mb-6 text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-white">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center border p-4 rounded-md bg-amber-800">
              <Image
                src={item.image_url}
                alt={item.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-md"
                priority
              />
              <div className="ml-4 flex-1 text-white">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Size: {item.selectedSize}</p>
                <p>${(item.price / 100).toFixed(2)} x {item.quantity}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-600 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-600 rounded">+</button>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="ml-4 text-red-400">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right text-white">
            <p className="text-xl">Total: ${(total / 100).toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-4 inline-block bg-[#d53302] text-white px-6 py-2 rounded focus:bg-[#d57902] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}