'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  category: string
  sizes: string[]
  colors: string[]
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

const CategoryPage = () => {
  const params = useParams()
  const categorySlug = params.slug as string
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 1000],
    sizes: [] as string[],
    colors: [] as string[],
    inStock: false
  })

  const productsPerPage = 12

  // Get category info
  const getCategoryInfo = () => {
    if (categorySlug === 'men') {
      return { name: 'Men\'s Collection', description: 'Discover our complete range of men\'s fashion' }
    } else if (categorySlug === 'women') {
      return { name: 'Women\'s Collection', description: 'Explore our latest women\'s styles and trends' }
    } else if (categorySlug === 'kids') {
      return { name: 'Kids\' Collection', description: 'Fun and comfortable clothing for children' }
    } else {
      const category = categoriesData.find(cat => cat.slug === categorySlug)
      return category ? { name: category.name, description: `Shop our ${category.name.toLowerCase()} collection` } : null
    }
  }

  const categoryInfo = getCategoryInfo()

  useEffect(() => {
    // Filter products by category
    let categoryProducts: Product[] = []
    
    if (categorySlug === 'men') {
      categoryProducts = productsData.filter(p => p.category.startsWith('men'))
    } else if (categorySlug === 'women') {
      categoryProducts = productsData.filter(p => p.category.startsWith('women'))
    } else if (categorySlug === 'kids') {
      categoryProducts = productsData.filter(p => p.category.startsWith('kids'))
    } else {
      categoryProducts = productsData.filter(p => p.category === categorySlug)
    }

    setProducts(categoryProducts as Product[])
    setFilteredProducts(categoryProducts as Product[])
  }, [categorySlug])

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      )
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      )
    }

    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      )
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      )
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // newest - keep original order
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, filters, sortBy])

  // Get unique values for filters
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand)))
  const uniqueSizes = Array.from(new Set(products.flatMap(p => p.sizes)))
  const uniqueColors = Array.from(new Set(products.flatMap(p => p.colors)))
  
  // Get relevant categories for this category page
  const relevantCategories = categoriesData.filter(cat => {
    if (categorySlug === 'men') return cat.parent === 'men'
    if (categorySlug === 'women') return cat.parent === 'women'
    if (categorySlug === 'kids') return cat.parent === 'kids'
    return cat.slug === categorySlug
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' }
  ]

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="text-gray-600 mt-2">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryInfo.name}</h1>
        <p className="text-gray-600">{categoryInfo.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <CategoryFilter
            categories={relevantCategories}
            brands={uniqueBrands}
            sizes={uniqueSizes}
            colors={uniqueColors}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-outline"
              >
                Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 border rounded-lg ${
                        currentPage === page
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
