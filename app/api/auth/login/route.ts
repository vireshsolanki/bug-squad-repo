import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { signToken } from '@/lib/auth'
import usersData from '@/data/users.json'
import type { User } from '@/lib/types'

const users = usersData as User[]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = users.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({ userId: user.id, email: user.email, role: user.role })

    const response = NextResponse.json({ success: true, userId: user.id })

    response.cookies.set('auth-token', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    response.cookies.set('user-id', user.id, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
