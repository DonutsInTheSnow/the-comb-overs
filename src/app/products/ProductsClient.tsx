'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  sizes: string[];
  stripe_price_id: string;
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const productsFromDB = await fetchProducts();
      setProducts(productsFromDB);
    };
    getProducts();
  }, []);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, selectedSize);
    setNotification(`${product.name} (Size: ${selectedSize}) added to cart!`);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  return (
    <main className="p-8 max-w-6xl mx-auto bg-black mt-16 mb-24 md:mt-[120px] xl:mt-[100px]">
      <h1 className="font-joti text-[24px] text-center">MERCH</h1>
      <h2 className="font-iceland text-[42px] md:text-[70px] text-center md:mt-[-20px]" style={{ textShadow: '0 4px 4px #000000' }}>The Comb Overs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-lg col-span-full text-white">No products available.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow bg-gray-800"
            >
              <Image
                src={product.image_url}
                alt={product.name}
                width={500}
                height={192}
                className="w-full h-48 object-cover rounded-md"
                priority
              />
              <h2 className="text-2xl font-semibold mt-2 text-white">{product.name}</h2>
              <p className="text-xl text-green-400">${(product.price / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-300">Sizes: {product.sizes.join(', ')}</p>
              <div className="mt-2">
                <label htmlFor={`size-${product.id}`} className="mr-2 text-white">
                  Select Size:
                </label>
                <select
                  id={`size-${product.id}`}
                  value={selectedSizes[product.id] || product.sizes[0]}
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  className="border rounded p-1"
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-[#d53302] text-white px-4 py-2 rounded focus:bg-[#d57902] focus:ring-2 focus:ring-[#d53302] cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-3 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
    </main>
  );
}