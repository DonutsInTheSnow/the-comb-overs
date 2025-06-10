'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import Link from 'next/link';

function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-8 max-w-6xl mx-auto bg-black">
      <h1 className="text-[42px] font-bold mb-6 text-white">Purchase Successful!</h1>
      <p className="text-lg text-gray-300">
        Thank you for your purchase! You&rsquo;ll receive a confirmation email soon.
      </p>
      <Link href="/products" className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
        Continue Shopping
      </Link>
    </main>
  );
}

export default SuccessPage;