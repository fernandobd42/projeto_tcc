import { validateUser, getUserId, Context } from '../../utils'

import * as bcrypt from 'bcryptjs'

export const user = {
  async updateUser(parent, { name, email, currentEmail, password }, ctx: Context, info) {
    await validateUser(ctx, currentEmail, password)
    const id = getUserId(ctx)

    return ctx.prisma.updateUser({
      where: { id },
      data: {
        name,
        email
      }
    })
  },

  async updatePassword(parent, { currentEmail, currentPassword, newPassword }, ctx: Context, info) {
    await validateUser(ctx, currentEmail, currentPassword)
    const id = getUserId(ctx)

    const password = await bcrypt.hash(newPassword, 10)
    return ctx.prisma.updateUser({
      where: { id },
      data: {
        password
      }
    })
  },
}
