'use client'

import Link from 'next/link'
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useWishlistStore } from '@/stores/useWishlistStore'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/utils/formatter'
import productsData from '@/data/products.json'

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = (item: any) => {
    // Get full product details
    const product = productsData.find(p => p.id === item.id)
    if (product) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: product.sizes[0], // Default to first size
        color: product.colors[0] // Default to first color
      })
      // Show success message
      alert('Added to cart!')
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">💝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite items to keep track of them.</p>
          <Link
            href="/products"
            className="btn-primary"
          >
            Discover Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearWishlist}
          className="text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Link href={`/products/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                title="Remove from wishlist"
              >
                <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  <Link href={`/products/${item.id}`}>
                    {item.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  title="Add to cart"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default WishlistPage
