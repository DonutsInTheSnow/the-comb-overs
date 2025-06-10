import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductsClient from '@/app/products/ProductsClient';
import { useCart } from '@/lib/CartContext';
import { fetchProducts } from '@/lib/supabaseClient';

// Mock useCart
jest.mock('@/lib/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock fetchProducts
jest.mock('@/lib/supabaseClient', () => ({
  fetchProducts: jest.fn(),
}));

describe('ProductsClient', () => {
  const mockAddToCart = jest.fn();
  const mockProducts = [
    {
      id: '1af7ea6f-f5ba-4679-80bd-9d63073481b6',
      name: 'Band Tee',
      price: 2500,
      image_url: '/images/band-tee.webp',
      sizes: ['S', 'M', 'L'],
      stripe_price_id: 'price_1RWm8z9WgIcPWiBAWrsZ4wiD',
    },
    {
      id: '480b5d23-c2c4-4dba-b896-1090bf0221d8',
      name: 'Official Toupee',
      price: 1500,
      image_url: '/images/official-toupee.webp',
      sizes: ['One Size'],
      stripe_price_id: 'price_1RWmAx9WgIcPWiBAidPIUOPh',
    },
    {
      id: '8329dc55-7a58-465a-b3ec-dae8f9287c51',
      name: 'Bumper Sticker',
      price: 500,
      image_url: '/images/bumper-sticker.webp',
      sizes: [],
      stripe_price_id: 'price_1RWm9b9WgIcPWiBApwobaUwv',
    },
  ];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders products and allows adding Band Tee to cart', async () => {
    await act(async () => {
      render(<ProductsClient />);
    });

    await screen.findByText('Band Tee');
    const addButton = screen.getAllByText('Add to Cart')[0]; // First product
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0], 'S');
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it('renders products and allows adding Official Toupee to cart', async () => {
    await act(async () => {
      render(<ProductsClient />);
    });

    await screen.findByText('Official Toupee');
    const addButton = screen.getAllByText('Add to Cart')[1]; // Second product
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[1], 'One Size');
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it('renders products and allows adding Bumper Sticker to cart', async () => {
    await act(async () => {
      render(<ProductsClient />);
    });

    await screen.findByText('Bumper Sticker');
    const addButton = screen.getAllByText('Add to Cart')[2]; // Third product
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[2], undefined);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});