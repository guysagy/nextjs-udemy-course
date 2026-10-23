import { PrismaClient } from './generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

export const db = createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
    if (!globalThis.prismaClient) {
        const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
        globalThis.prismaClient = new PrismaClient({ adapter });
    }
    return globalThis.prismaClient;
}

