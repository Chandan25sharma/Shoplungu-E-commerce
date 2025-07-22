'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/utils/formatter'
import { CheckCircleIcon, TruckIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'

interface OrderDetails {
  orderNumber: string
  orderDate: string
  estimatedDelivery: string
  items: any[]
  shippingAddress: any
  billingAddress: any
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const OrderConfirmationPage = () => {
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    // Get order details from URL params or localStorage
    const orderNumber = searchParams.get('order') || `SL${Date.now()}`
    const storedOrder = localStorage.getItem('lastOrder')
    
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder))
      // Clear the stored order after retrieving it
      localStorage.removeItem('lastOrder')
    } else {
      // Create a mock order if no stored order found
      const mockOrder: OrderDetails = {
        orderNumber,
        orderDate: new Date().toLocaleDateString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        items: [],
        shippingAddress: {
          fullName: 'John Doe',
          address: '123 Main Street',
          city: 'Riyadh',
          country: 'Saudi Arabia',
          postalCode: '11564'
        },
        billingAddress: {
          fullName: 'John Doe',
          address: '123 Main Street',
          city: 'Riyadh',
          country: 'Saudi Arabia',
          postalCode: '11564'
        },
        paymentMethod: 'Credit Card ending in ****1234',
        subtotal: 299.99,
        shipping: 25.00,
        tax: 32.50,
        total: 357.49
      }
      setOrderDetails(mockOrder)
    }

    // Clear cart after successful order
    clearCart()
  }, [searchParams, clearCart])

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-xl font-semibold">Order #{orderDetails.orderNumber}</h2>
              <p className="text-primary-100">Placed on {orderDetails.orderDate}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatPrice(orderDetails.total)}</div>
              <div className="text-primary-100">Total</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Order Status */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-500">We've received your order</p>
              </div>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gray-200 rounded">
                <div className="h-1 bg-green-500 rounded w-1/3"></div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                <TruckIcon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Shipped</p>
                <p className="text-sm text-gray-400">Est. {orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>
                <p className="text-gray-600">{orderDetails.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}
                </p>
                <p className="text-gray-600">{orderDetails.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{orderDetails.paymentMethod}</p>
                <p className="text-gray-600">Charged on {orderDetails.orderDate}</p>
              </div>
            </div>
          </div>

          {/* Order Total Breakdown */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatPrice(orderDetails.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(orderDetails.tax)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">{formatPrice(orderDetails.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Track Your Order */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <TruckIcon className="h-8 w-8 text-primary-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Track Your Order</h3>
          </div>
          <p className="text-gray-600 mb-4">
            We'll send you shipping confirmation and tracking information once your order ships.
          </p>
          <Link
            href="/orders"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View order status →
          </Link>
        </div>

        {/* Customer Support */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <EnvelopeIcon className="h-8 w-8 text-primary-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to help with any questions about your order.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              <span>support@shoplungu.com</span>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>+966 11 123 4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="btn-primary text-center"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-outline text-center"
        >
          Print Receipt
        </button>
      </div>

      {/* Email Confirmation Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <EnvelopeIcon className="h-5 w-5 text-blue-600" />
          <p className="ml-2 text-blue-800">
            Order confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
