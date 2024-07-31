import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export async function loadDb() {
  await prisma.ticket.deleteMany();
  await prisma.game.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();
  console.log('Seeding...');

  const users = [
    await prisma.user.create({
      data: {
        email: 'lisa@simpson.com',
        firstname: 'Lisa',
        lastname: 'Simpson',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
        role: 'USER',
      },
    }),
    await prisma.user.create({
      data: {
        email: 'bart@simpson.com',
        firstname: 'Bart',
        lastname: 'Simpson',
        role: 'ADMIN',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
      },
    }),
  ];
  const teams = [
    await prisma.team.create({
      data: {
        code: 'ARI',
        name: 'Cardinals',
        fullName: 'Arizona Cardinals',
      },
    }),
    await prisma.team.create({
      data: {
        code: 'ATL',
        name: 'Falcons',
        fullName: 'Atlanta Falcons',
      },
    }),
    await prisma.team.create({
      data: {
        code: 'BAL',
        name: 'Ravens',
        fullName: 'Baltimore Ravens',
      },
    }),
    await prisma.team.create({
      data: {
        code: 'BUF',
        name: 'Bills',
        fullName: 'Buffalo Bills',
      },
    }),
  ];
  const games = [
    await prisma.game.create({
      data: {
        homeTeamId: teams[0].id,
        awayTeamId: teams[1].id,
        startTime: new Date(),
        homeSpread: 3,
        awaySpread: -3,
        league: 'americanfootball_nfl',
      },
    }),
    await prisma.game.create({
      data: {
        homeTeamId: teams[2].id,
        awayTeamId: teams[3].id,
        startTime: new Date(),
        homeSpread: 3,
        awaySpread: -3,
        league: 'americanfootball_nfl',
      },
    }),
  ];
  const tickets = [
    await prisma.ticket.create({
      data: {
        creatorId: users[1].id,
        matchingUserId: users[0].id,
        matchId: games[0].id,
        homeSpread: 2,
        awaySpread: -2,
        isOpen: true,
        amount: 100,
      },
    }),
  ];
  const createdEntities = {
    users: users,
    teams: teams,
    games: games,
    tickets: tickets,
  };

  console.log(createdEntities);
  return createdEntities;
}
