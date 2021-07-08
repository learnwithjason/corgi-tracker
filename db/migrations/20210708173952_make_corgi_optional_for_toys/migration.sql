-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Toy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "corgiId" INTEGER,
    FOREIGN KEY ("corgiId") REFERENCES "Corgi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Toy" ("corgiId", "createdAt", "id", "name", "updatedAt") SELECT "corgiId", "createdAt", "id", "name", "updatedAt" FROM "Toy";
DROP TABLE "Toy";
ALTER TABLE "new_Toy" RENAME TO "Toy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
