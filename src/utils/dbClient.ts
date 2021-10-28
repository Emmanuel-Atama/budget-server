import { PrismaClient } from '@prisma/client'

const dbClient: PrismaClient = new PrismaClient();

export default dbClient;