'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface Category {
  slug: string
  name: string
  parent: string
}

interface Filters {
  categories: string[]
  brands: string[]
  priceRange: number[]
  sizes: string[]
  colors: string[]
  inStock: boolean
}

interface CategoryFilterProps {
  categories: Category[]
  brands: string[]
  sizes: string[]
  colors: string[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const CategoryFilter = ({
  categories,
  brands,
  sizes,
  colors,
  filters,
  onFiltersChange
}: CategoryFilterProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    sizes: false,
    colors: false,
    availability: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (type: keyof Filters, value: any) => {
    const newFilters = { ...filters }
    
    if (Array.isArray(newFilters[type])) {
      const array = newFilters[type] as any[]
      if (array.includes(value)) {
        newFilters[type] = array.filter(item => item !== value) as any
      } else {
        newFilters[type] = [...array, value] as any
      }
    } else {
      newFilters[type] = value
    }
    
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      inStock: false
    })
  }

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStock ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string
    sectionKey: keyof typeof expandedSections
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories" sectionKey="categories">
        {categories.map((category) => (
          <label key={category.slug} className="flex items-center">
            <input
              type="checkbox"
              checked={filters.categories.includes(category.slug)}
              onChange={() => handleFilterChange('categories', category.slug)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">{category.name}</span>
          </label>
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brands">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => handleFilterChange('brands', brand)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">{brand}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Sizes" sectionKey="sizes">
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleFilterChange('sizes', size)}
              className={`px-2 py-1 text-sm border rounded ${
                filters.sizes.includes(size)
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors" sectionKey="colors">
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleFilterChange('colors', color)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  )
}

export default CategoryFilter
