import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  const game1 = await prisma.game.create({
    data: {
      homeTeam: 'Baltimore Ravens',
      awayTeam: 'San Francisco 49ers',
      startTime: new Date(),
      homeSpread: 3,
      awaySpread: -3,
      league: 'americanfootball_nfl',
    },
  });
  const game2 = await prisma.game.create({
    data: {
      homeTeam: 'Dallas Cowboys',
      awayTeam: 'Indianapolis Colts',
      startTime: new Date(),
      homeSpread: 3,
      awaySpread: -3,
      league: 'americanfootball_nfl',
    },
  });

  console.log({ user1, user2, game1, game2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
