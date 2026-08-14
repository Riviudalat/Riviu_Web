/**
 * Dữ liệu kiến thức khởi tạo cho Trợ lý Riviu — trích từ bảng giá Cost.pdf
 * (Riviu Đà Lạt, áp dụng từ 01/2026). Không đính kèm file: bot luôn dẫn
 * khách tới trang /bang-gia thay vì đưa PDF.
 */

export const KNOWLEDGE_SEED = [
  {
    title: 'Bảng giá gói combo Facebook',
    keywords:
      'bảng giá, giá, chi phí, báo giá, gói, combo, facebook, khuyến mãi, ưu đãi, bao nhiêu tiền',
    content:
      'Riviu Đà Lạt có 4 gói combo Facebook (ưu đãi cho khách tại Đà Lạt, từ 01/2026):\n' +
      '• Gói 1 — 7.500.000đ (giá gốc 12.000.000đ): 2 bài review + 3 bài check-in + 1 bài tổng hợp. Cam kết tối thiểu 600 tương tác.\n' +
      '• Gói 2 — 10.500.000đ (giá gốc 15.000.000đ): 1 bài review + 5 check-in + 1 bài fanpage + 1 bài tổng hợp + hỗ trợ FB ADS. Cam kết 800 tương tác + 70.000 lượt tiếp cận.\n' +
      '• Gói 3 — 12.900.000đ (giá gốc 18.500.000đ): 2 bài review + 5 check-in + 1 bài fanpage + 1 bài tổng hợp + FB ADS. Cam kết 1.000 tương tác + 70.000 lượt tiếp cận. (Phổ biến nhất)\n' +
      '• Gói 4 — 17.400.000đ (giá gốc 23.500.000đ): thêm bài review trên group "Thánh Riviu". Cam kết 1.500 tương tác + 70.000 lượt tiếp cận.\n' +
      'Xem chi tiết tại trang /bang-gia. Lưu ý: 1 gói / quán / 30 ngày.',
    attachmentUrl: null,
  },
  {
    title: 'Gói TikTok phủ sóng',
    keywords: 'tiktok, phủ sóng, view, video ngắn, gói tiktok',
    content:
      'Gói TikTok phủ sóng thương hiệu — bảng giá riêng, tách khỏi các gói Facebook (nội dung tạo và chuẩn hóa bằng AI, lồng ghép tự nhiên):\n' +
      '• Gói Cơ Bản — 5.000.000đ/tháng: 150 nội dung, cam kết 300.000 view.\n' +
      '• Gói Tiêu Chuẩn — 7.000.000đ/tháng: 200 nội dung + 5 ảnh lướt riêng, cam kết 350.000 view.\n' +
      '• Gói Mở Rộng — 10.000.000đ/tháng: 350 nội dung + 10 ảnh lướt, cam kết 600.000 view.\n' +
      '• Gói Tăng Trưởng — 15.000.000đ/tháng: 600 nội dung + 15 ảnh lướt, cam kết 800.000 view.',
    attachmentUrl: null,
  },
  {
    title: 'Gói Facebook tháng và gói duyệt bài',
    keywords:
      'gói tháng, facebook tháng, duyệt bài, hàng tháng, định kỳ, 5 triệu',
    content:
      'Gói Facebook tháng — 5.000.000đ/tháng TRỌN GÓI (không tách lẻ), gồm cả 2 hạng mục:\n' +
      '• Bài tổng hợp / lịch trình: đăng 2 bài lên group "Đà Lạt đi và trải nghiệm" + reup 2 bài lên group "Review Đà Lạt" (trong vòng 1 tuần) — tổng 8 bài/tháng.\n' +
      '• Bài check-in: đăng 3 bài trên "Đà Lạt đi và trải nghiệm" + reup 3 bài trên "Review Đà Lạt" (trong vòng 1 tuần) — tổng 12 bài/tháng.\n' +
      'Tổng cộng 20 bài/tháng. Chỉ áp dụng 1 gói / quán / 30 ngày, tính từ ngày đầu tiên đăng bài.\n' +
      'Gói duyệt bài (khách tự chuẩn bị nội dung, dạng check-in):\n' +
      '• 30 bài / 1 group — 3.000.000đ/tháng hoặc 7.500.000đ/3 tháng.\n' +
      '• 40 bài / 2 group — 3.000.000đ/tháng hoặc 7.500.000đ/3 tháng.\n' +
      '• 60 bài / 2 group — 3.500.000đ/tháng hoặc 9.000.000đ/3 tháng.\n' +
      'Gói xây kênh: TikTok 6.000.000đ/tháng (10 clip + 2 bài hình), Fanpage Facebook 3.000.000đ/tháng (12 bài).',
    attachmentUrl: null,
  },
  {
    title: 'Dịch vụ lẻ: bài review, chụp hình, video',
    keywords:
      'dịch vụ lẻ, chụp hình, chụp ảnh, video, quay phim, bài review, đăng bài, fanpage, giá lẻ',
    content:
      'Một số dịch vụ lẻ tiêu biểu của Riviu Đà Lạt:\n' +
      '• Chụp hình cơ bản (20 tấm): 2.000.000đ; nâng cao có mẫu (50 tấm): 4.000.000đ.\n' +
      '• 1 bài review group "Đà Lạt đi và trải nghiệm": 2.500.000đ; kèm reup group "Review Đà Lạt": 3.500.000đ.\n' +
      '• 1 bài review group "Thánh Riviu": 5.000.000đ; đăng cả 2 group lớn: 7.000.000đ.\n' +
      '• Bài viết fanpage: Riviu.vn Đà Lạt 4.500.000đ (70K tiếp cận), Thánh Riviu 5.000.000đ (100K), Địa Điểm Ăn Uống 8.000.000đ (100K).\n' +
      '• Bài tổng hợp/lịch trình group: từ 2.000.000đ. Chăm sóc fanpage 15 bài/tháng: 5.000.000đ. Combo "Đà Lạt +" (ảnh + IG + video + TikTok): 12.500.000đ.\n' +
      'Đầy đủ 21 hạng mục tại trang /bang-gia (mục Dịch vụ lẻ).',
    attachmentUrl: null,
  },
  {
    title: 'Booking KOL TikTok review',
    keywords: 'kol, koc, booking, kênh tiktok, review tiktok, influencer',
    content:
      'Giá booking video review trên các kênh TikTok hệ sinh thái Riviu Đà Lạt (theo follower):\n' +
      '• Đi và Trải Nghiệm (281K follower): 2.000.000đ/video.\n' +
      '• La Cà Khắp Nơi (173K): 1.500.000đ. • Tung Tăng Khắp Nơi (67K): 1.000.000đ.\n' +
      '• Combo Châm đi đâu đó + Vivu Cùng Tui: 2.500.000đ.\n' +
      '• Nhiều kênh khác từ 500.000đ — 1.500.000đ/video tùy follower và hình thức (voice off / chèn nhạc + text).\n' +
      'Danh sách 17 kênh đầy đủ tại trang /bang-gia (mục KOL TikTok).',
    attachmentUrl: null,
  },
  {
    title: 'Phụ thu và quy định quảng cáo',
    keywords: 'phụ thu, quy định, di chuyển, cuối tuần, ngoài giờ, clip gốc',
    content:
      'Phụ thu: di chuyển nhiều chi nhánh 200.000đ/chi nhánh; khu vực 15-20km 300.000đ/sản phẩm; trên 25km hoặc tỉnh khác (ekip 3 người) 1.500.000đ/ngày; cuối tuần và ngoài giờ (17-22h) có phụ thu — liên hệ để biết chi tiết.\n' +
      'Quy định chính: triển khai chụp tối đa 2 giờ (video 3 giờ) từ lúc chốt lịch; dự thảo sau 3-5 ngày làm việc; video gắn logo Riviu; không bàn giao clip gốc; chi phí món ăn khi triển khai do đối tác hỗ trợ.',
    attachmentUrl: null,
  },
  {
    title: 'Hệ sinh thái kênh và hiệu quả thật',
    keywords:
      'kênh, fanpage, group, nhóm, follower, thành viên, hệ sinh thái, hiệu quả, reach, tiếp cận, tương tác, số liệu, insight, chứng minh, uy tín',
    content:
      'Riviu Đà Lạt vận hành 6 fanpage và group trên Facebook, tổng gần 7,9 triệu người theo dõi và thành viên:\n' +
      '• Fanpage "Thánh Riviu - Riviu.vn" (đã xác minh): 3,1 triệu người theo dõi, 2 triệu lượt thích.\n' +
      '• Group "Thánh Riviu": 2,3 triệu thành viên. • Group "Review Đà Lạt": 1,3 triệu thành viên.\n' +
      '• Group "Đà Lạt Đi Và Trải Nghiệm": 884,8K thành viên.\n' +
      '• Fanpage "Riviu.vn Đà Lạt": 239K người theo dõi. • Fanpage "Đà Lạt Đi Đâu?": 158K người theo dõi.\n' +
      'Hiệu quả thật (số liệu Facebook Insights của 7 bài viết nổi bật): tổng 88 triệu lượt hiển thị, 27,7 triệu người tiếp cận, 2,1 triệu lượt tương tác. Bài cao nhất "Đừng bỏ lỡ 15 địa điểm ăn chơi quên lối về này ở Đà Lạt" đạt 27.406.867 lượt hiển thị, 7.494.873 người tiếp cận và 744.961 tương tác.\n' +
      'Ngoài ra còn 17 kênh TikTok KOL với hơn 753.000 follower. Xem ảnh chụp Insights và toàn bộ kênh tại trang /bang-gia.',
    attachmentUrl: null,
  },
  {
    title: 'Quy trình hợp tác với Riviu',
    keywords: 'quy trình, hợp tác, các bước, bắt đầu, làm việc',
    content:
      'Hợp tác cùng Riviu Đà Lạt gồm 4 bước:\n' +
      '1. Kết nối & brief — trao đổi mục tiêu, khẩu vị thương hiệu, ngân sách.\n' +
      '2. Chiến lược & báo giá — đề xuất kênh, KOL phù hợp kèm báo giá chi tiết.\n' +
      '3. Triển khai chiến dịch — sản xuất nội dung, đăng bài theo lịch, tối ưu liên tục.\n' +
      '4. Báo cáo & mở rộng — tổng kết số liệu minh bạch, đề xuất bước tiếp theo.\n' +
      'Bắt đầu bằng cách để lại thông tin ở mục Liên hệ hoặc email contact@riviu.vn.',
    attachmentUrl: null,
  },
  {
    title: 'Về Riviu và thông tin liên hệ',
    keywords:
      'riviu là gì, công ty, rivico, liên hệ, địa chỉ, hotline, số điện thoại, email',
    content:
      'Riviu là mạng xã hội chia sẻ trải nghiệm ăn uống, du lịch và đời sống thuộc Công ty TNHH RIVICO (giấy phép MXH số 528/GP-BTTTT). Riviu Đà Lạt vận hành hệ sinh thái group + fanpage + TikTok với hàng trăm nghìn thành viên, cung cấp dịch vụ truyền thông cho thương hiệu F&B.\n' +
      'Liên hệ: email contact@riviu.vn · hotline 028 62725439 (giờ hành chính) · địa chỉ 372-374 Trần Hưng Đạo, Phường 2, Quận 5, TP.HCM.',
    attachmentUrl: null,
  },
];
