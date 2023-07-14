-- CreateEnum
CREATE TYPE "OauthProvider" AS ENUM ('LOCAL', 'KAKAO', 'GOOGLE');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "provider" "OauthProvider" NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT,
    "userImage" TEXT,
    "userRole" "ROLE",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
