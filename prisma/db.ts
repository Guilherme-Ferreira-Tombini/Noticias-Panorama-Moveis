// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Criar o adapter com a URL do banco
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

// Instanciar o PrismaClient com o adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma