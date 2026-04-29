import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import usersData from '@/data/users.json'
import type { User } from '@/lib/types'

const users = usersData as User[]

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id)
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  const { password: _pw, ...safeUser } = user
  return NextResponse.json(safeUser)
}
