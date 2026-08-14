-- Giữ đường dẫn cùng section để dashboard phân biệt cùng một section ID
-- xuất hiện ở trang chủ hay trang bảng giá.
ALTER TABLE "SectionEvent"
ADD COLUMN "path" TEXT NOT NULL DEFAULT '/';

CREATE INDEX "SectionEvent_path_sectionId_idx"
ON "SectionEvent"("path", "sectionId");
