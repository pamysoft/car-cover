/*
  Warnings:

  - You are about to drop the column `yearId` on the `makes` table. All the data in the column will be lost.
  - You are about to drop the column `makeId` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `models` table. All the data in the column will be lost.
  - You are about to drop the column `makeId` on the `trims` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `trims` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `trims` table. All the data in the column will be lost.
  - Added the required column `year_id` to the `makes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make_id` to the `models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_id` to the `models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make_id` to the `trims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_id` to the `trims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_id` to the `trims` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_makes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "year_id" INTEGER NOT NULL,
    CONSTRAINT "makes_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_makes" ("handle", "id", "title") SELECT "handle", "id", "title" FROM "makes";
DROP TABLE "makes";
ALTER TABLE "new_makes" RENAME TO "makes";
CREATE TABLE "new_models" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    CONSTRAINT "models_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "makes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "models_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_models" ("handle", "id", "title") SELECT "handle", "id", "title" FROM "models";
DROP TABLE "models";
ALTER TABLE "new_models" RENAME TO "models";
CREATE TABLE "new_trims" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "make_id" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    CONSTRAINT "trims_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trims_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "makes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trims_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_trims" ("handle", "id", "title") SELECT "handle", "id", "title" FROM "trims";
DROP TABLE "trims";
ALTER TABLE "new_trims" RENAME TO "trims";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
