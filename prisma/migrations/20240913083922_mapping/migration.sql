/*
  Warnings:

  - You are about to drop the `Make` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Year` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Make";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Model";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trim";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Year";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "years" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "makes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "makes_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "models" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "makeId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "models_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "makes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "models_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trims" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "modelId" INTEGER NOT NULL,
    "makeId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "trims_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trims_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "makes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trims_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
