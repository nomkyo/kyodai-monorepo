import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.game.deleteMany();
  await prisma.team.deleteMany();

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
  const team1 = await prisma.team.create({
    data: {
      code: 'ARI',
      name: 'Cardinals',
      fullName: 'Arizona Cardinals',
    },
  });
  const team2 = await prisma.team.create({
    data: {
      code: 'ATL',
      name: 'Falcons',
      fullName: 'Atlanta Falcons',
    },
  });
  const team3 = await prisma.team.create({
    data: {
      code: 'BAL',
      name: 'Ravens',
      fullName: 'Baltimore Ravens',
    },
  });
  const team4 = await prisma.team.create({
    data: {
      code: 'BUF',
      name: 'Bills',
      fullName: 'Buffalo Bills',
    },
  });

  const game1 = await prisma.game.create({
    data: {
      homeTeamId: team1.id,
      awayTeamId: team2.id,
      startTime: new Date(),
      homeSpread: 3,
      awaySpread: -3,
      league: 'americanfootball_nfl',
    },
  });
  const game2 = await prisma.game.create({
    data: {
      homeTeamId: team3.id,
      awayTeamId: team4.id,
      startTime: new Date(),
      homeSpread: 3,
      awaySpread: -3,
      league: 'americanfootball_nfl',
    },
  });

  console.log({ user1, user2, team1, team2, team3, team4, game1, game2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
