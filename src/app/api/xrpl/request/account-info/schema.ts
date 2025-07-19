import { z } from 'zod'
import { NetworkTypes } from '@/config/enum'

export const AccountInfoQuerySchema = z.object({
  network: z.enum(NetworkTypes),
  account: z.string().min(1, 'アカウントアドレスは必須です')
})

export type AccountInfoQuery = z.infer<typeof AccountInfoQuerySchema>
