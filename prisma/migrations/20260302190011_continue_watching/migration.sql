/*
  Warnings:

  - Added the required column `title` to the `ContinueWatching` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContinueWatching" ADD COLUMN     "backdropPath" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "genreIds" INTEGER[],
ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
