import { NextResponse } from 'next/server'
import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'

const products = productsData as Product[]

export async function GET() {
  return NextResponse.json(products)
}
