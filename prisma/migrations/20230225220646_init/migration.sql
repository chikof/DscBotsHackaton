-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "guilds" (
    "id" BIGINT NOT NULL,
    "ticket_channel" BIGINT NOT NULL,
    "ticket_category" BIGINT,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "channel_id" BIGINT NOT NULL,
    "guild_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("channel_id","guild_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
