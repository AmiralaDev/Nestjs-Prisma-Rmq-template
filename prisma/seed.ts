import { postSeed } from './seeds/post.seed';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

function main() {
  return Promise.all([postSeed(prismaClient)]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
