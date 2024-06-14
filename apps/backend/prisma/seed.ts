import { loadDb, prisma } from './load-db';

loadDb()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
