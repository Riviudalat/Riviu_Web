-- Form liên hệ khách gửi từ landing.
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactLead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactLead_createdAt_idx" ON "ContactLead"("createdAt");
