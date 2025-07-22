export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Loading Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary-600"></div>
        <div className="absolute inset-0 animate-spin rounded-full h-20 w-20 border-r-2 border-primary-300" style={{ animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Loading...</h2>
        <p className="text-sm text-gray-600">Please wait while we prepare your content</p>
      </div>

      {/* Loading Animation with Brand */}
      <div className="mt-6 flex items-center space-x-2">
        <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Brand Name */}
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-primary-600">Shoplungu</p>
        <p className="text-sm text-gray-500">Fashion for Everyone</p>
      </div>
    </div>
  )
}
