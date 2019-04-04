import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma-client'

export interface Context {
  prisma: Prisma
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (!!Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export async function validateUser(ctx: Context, email: string, password: string) {
  const user = await ctx.prisma.user({ email })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return user
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

