-- CreateTable
CREATE TABLE "Year" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Make" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "Make_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "makeId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "Model_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Model_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trim" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "modelId" INTEGER NOT NULL,
    "makeId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    CONSTRAINT "Trim_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Trim_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Trim_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Year_handle_key" ON "Year"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Make_handle_key" ON "Make"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Model_handle_key" ON "Model"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Trim_handle_key" ON "Trim"("handle");
