'use client'

import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/utils/formatter'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartItemProps {
  item: CartItem
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(item.id, item.size, item.color)
    } else {
      updateQuantity(item.id, item.size, item.color, newQuantity)
    }
  }

  const handleRemove = () => {
    removeItem(item.id, item.size, item.color)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/products/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg hover:opacity-75 transition-opacity"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                <Link 
                  href={`/products/${item.id}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.name}
                </Link>
              </h3>
              
              <div className="mt-1 flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span>Color: {item.color}</span>
                </div>
              </div>

              <div className="mt-2 text-sm font-medium text-gray-900">
                {formatPrice(item.price)}
              </div>
            </div>

            {/* Quantity and Remove */}
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-l-lg"
                  disabled={item.quantity <= 1}
                >
                  <span className="text-lg">-</span>
                </button>
                
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || 1
                    if (newQuantity >= 1 && newQuantity <= 99) {
                      handleQuantityChange(newQuantity)
                    }
                  }}
                  className="w-12 h-8 text-center border-0 focus:ring-0 text-sm"
                />
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-r-lg"
                  disabled={item.quantity >= 99}
                >
                  <span className="text-lg">+</span>
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={handleRemove}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove item"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
