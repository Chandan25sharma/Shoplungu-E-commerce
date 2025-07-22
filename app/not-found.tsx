import Link from 'next/link'
import { MagnifyingGlassIcon, HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100 mb-8">
            <span className="text-6xl font-bold text-red-600">404</span>
          </div>
          
          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            href="/products"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Browse Products
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
            <p className="ml-2 text-blue-800">
              Try using our search to find what you're looking for.
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If you think this is a mistake, please{' '}
            <Link href="/contact" className="text-primary-600 hover:text-primary-700">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
