import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-in-production'
)

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'))
    return payload
  } catch {
    return null
  }
}

export function getTokenFromCookieHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(/auth-token=([^;]+)/)
  return match ? match[1] : null
}
