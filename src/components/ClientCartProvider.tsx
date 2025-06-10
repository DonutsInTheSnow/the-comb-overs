'use client';

import { CartProvider } from '@/lib/CartContext';
import { ReactNode } from 'react';

export default function ClientCartProvider({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}