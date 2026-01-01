-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingPlanDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dayLabel" TEXT NOT NULL,
    "chapters" INTEGER NOT NULL,

    CONSTRAINT "ReadingPlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingItem" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "planDayId" TEXT NOT NULL,

    CONSTRAINT "ReadingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planDayId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "UserCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingPlanDay_date_key" ON "ReadingPlanDay"("date");

-- CreateIndex
CREATE UNIQUE INDEX "UserCompletion_userId_planDayId_key" ON "UserCompletion"("userId", "planDayId");

-- AddForeignKey
ALTER TABLE "ReadingItem" ADD CONSTRAINT "ReadingItem_planDayId_fkey" FOREIGN KEY ("planDayId") REFERENCES "ReadingPlanDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompletion" ADD CONSTRAINT "UserCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompletion" ADD CONSTRAINT "UserCompletion_planDayId_fkey" FOREIGN KEY ("planDayId") REFERENCES "ReadingPlanDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
