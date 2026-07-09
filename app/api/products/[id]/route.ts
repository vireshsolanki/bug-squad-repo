import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'
import { getTokenFromCookieHeader, verifyToken } from '@/lib/auth'

const products = productsData as Product[]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authToken = getTokenFromCookieHeader(request.headers.get('Cookie'))
  if (!authToken || !(await verifyToken(authToken))) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const product = products.find(p => p.id === params.id)

  if (!product) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.json({
    ...product,
    category_label: product.category.toUpperCase(),
    fetched_at: new Date().toISOString(),
  })
}