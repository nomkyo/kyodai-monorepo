-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "matchingUserId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "homeSpread" INTEGER NOT NULL,
    "awaySpread" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_matchingUserId_fkey" FOREIGN KEY ("matchingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
