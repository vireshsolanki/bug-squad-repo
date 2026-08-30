import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'

const products = productsData as Product[]

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return NextResponse.json({
    ...product,
    category_label: product.category.toUpperCase(),
    fetched_at: new Date().toISOString(),
  })
}