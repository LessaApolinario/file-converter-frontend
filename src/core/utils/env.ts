import { z } from 'zod'

const envSchema = z.object({
  VITE_FILE_CONVERTER_API_URL: z.string(),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  console.log('❌ Variáveis de ambiente inválidas')
  throw new Error('❌ Variáveis de ambiente inválidas')
}

export const env = _env.data
