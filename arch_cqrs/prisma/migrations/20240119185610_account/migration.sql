-- CreateTable
CREATE TABLE "accounts" (
    "accountNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_accountNumber_key" ON "accounts"("accountNumber");
