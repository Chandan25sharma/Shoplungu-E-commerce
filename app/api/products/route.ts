import { NextRequest, NextResponse } from 'next/server'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  const limit = searchParams.get('limit')

  try {
    let results = [...productsData]

    // Filter by category if specified
    if (category) {
      results = results.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Search by query if specified
    if (query) {
      const searchQuery = query.toLowerCase()
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
      )
    }

    // Limit results if specified
    if (limit) {
      const limitNum = parseInt(limit)
      results = results.slice(0, limitNum)
    }

    return NextResponse.json({
      success: true,
      data: {
        products: results,
        total: results.length,
        categories: categoriesData
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    )
  }
}
