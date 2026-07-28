-- ============================================
-- KHOINGHIEP.TODAY — MySQL Database Schema
-- Database: khoinghiep_db | User: khoinghiep_user
-- Chạy: mysql -u khoinghiep_user -p khoinghiep_db < schema.sql
-- ============================================

-- Database đã được tạo qua aaPanel hoặc MySQL Server, chọn USE:
USE khoinghiep_db;

-- ── Bảng thành viên / doanh nghiệp ─────────────────────────────
CREATE TABLE IF NOT EXISTS members (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL COMMENT 'Tên doanh nghiệp / Dự án khởi nghiệp',
  tax_code      VARCHAR(20)  COMMENT 'Mã số thuế',
  license       VARCHAR(50)  COMMENT 'Số giấy phép kinh doanh / ĐKKD',
  industry      VARCHAR(100) COMMENT 'Lĩnh vực / Ngành nghề',
  size          VARCHAR(50)  COMMENT 'Quy mô nhân sự',
  address       TEXT         COMMENT 'Địa chỉ trụ sở / VP',
  website       VARCHAR(255) COMMENT 'Website',
  social        VARCHAR(255) COMMENT 'Fanpage / LinkedIn',
  description   TEXT         COMMENT 'Mô tả dự án & năng lực',
  tier          ENUM('Silver','Gold','Platinum') DEFAULT 'Silver' COMMENT 'Cấp độ thành viên',
  status        ENUM('pending','approved','rejected') DEFAULT 'pending',
  contact_name  VARCHAR(100) COMMENT 'Tên người đại diện / Founder',
  contact_pos   VARCHAR(100) COMMENT 'Chức vụ',
  email         VARCHAR(255) NOT NULL COMMENT 'Email liên hệ',
  phone         VARCHAR(20)  COMMENT 'Số điện thoại',
  goal          TEXT         COMMENT 'Mục tiêu tham gia hệ sinh thái',
  referral      VARCHAR(100) COMMENT 'Biết đến qua kênh nào',
  reject_reason TEXT         COMMENT 'Lý do từ chối',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_tier (tier),
  INDEX idx_industry (industry)
) ENGINE=InnoDB COMMENT='Danh sách thành viên & dự án khởi nghiệp Khoinghiep.today';

-- ── Bảng bài viết / cơ hội giao thương & gọi vốn ───────────────
CREATE TABLE IF NOT EXISTS posts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  member_id     INT NOT NULL COMMENT 'ID thành viên đăng bài',
  title         VARCHAR(500) NOT NULL COMMENT 'Tiêu đề bài viết / đề án',
  summary       TEXT         COMMENT 'Tóm tắt',
  body          LONGTEXT     COMMENT 'Nội dung chi tiết',
  type          VARCHAR(100) COMMENT 'Loại tin (Tìm đối tác, Gọi vốn, Tìm cố vấn, Đào tạo...)',
  category      VARCHAR(100) COMMENT 'Danh mục ngành',
  tags          TEXT         COMMENT 'Từ khoá (JSON array)',
  contact_info  VARCHAR(255) COMMENT 'Thông tin liên hệ',
  deadline      DATE         COMMENT 'Hạn liên hệ',
  status        ENUM('draft','pending','approved','rejected') DEFAULT 'pending',
  views         INT DEFAULT 0,
  reject_reason TEXT         COMMENT 'Lý do từ chối',
  published_at  TIMESTAMP NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_member (member_id),
  FULLTEXT idx_search (title, summary, body)
) ENGINE=InnoDB COMMENT='Bài viết & cơ hội hợp tác của thành viên';

-- ── Bảng sự kiện ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(500) NOT NULL,
  description   TEXT,
  event_date    DATE         NOT NULL,
  location      VARCHAR(255),
  organizer     VARCHAR(255) COMMENT 'Đơn vị tổ chức',
  capacity      INT          COMMENT 'Số lượng tham dự tối đa',
  status        ENUM('upcoming','ongoing','completed','cancelled') DEFAULT 'upcoming',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Sự kiện & Hội thảo Khởi nghiệp';

-- ── Bảng admin ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL COMMENT 'bcrypt hash',
  name          VARCHAR(100),
  email         VARCHAR(255),
  role          ENUM('superadmin','admin','moderator') DEFAULT 'admin',
  last_login    TIMESTAMP NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Tài khoản admin Khoinghiep.today';

-- ── Bảng cấu hình AI ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_config (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  provider      VARCHAR(50)  NOT NULL COMMENT 'openrouter/anthropic/openai/gemini...',
  model         VARCHAR(100) NOT NULL COMMENT 'Model ID',
  is_active     TINYINT(1) DEFAULT 1,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Cấu hình AI Multi-Agent';

-- ── Bảng chat logs ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_logs (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  session_id    VARCHAR(100) COMMENT 'Session ID',
  role          ENUM('user','assistant') NOT NULL,
  content       TEXT NOT NULL,
  provider      VARCHAR(50),
  model         VARCHAR(100),
  tokens_in     INT DEFAULT 0,
  tokens_out    INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id)
) ENGINE=InnoDB COMMENT='Lịch sử tương tác Trợ lý AI';

-- ============================================
-- DỮ LIỆU MẪU KHOINGHIEP.TODAY
-- ============================================

-- Admin mặc định (admin / Admin@123 và info@khoinghiep.today / 123@456Happy)
INSERT INTO admins (username, password_hash, name, email, role) VALUES
('admin', '$2b$10$3luJFH.EMVPnxeH8BdXn9.5tnCQ9huv13yzOzHrwYGiRhgV7dcufq', 'Quản trị viên DISC', 'info@khoinghiep.today', 'superadmin'),
('info@khoinghiep.today', '$2b$10$AGWau8dQOLAHZFfbFB8Rie.dwXc1CH/5KaTtc0hZbJhFG8nM7lMei', 'Ban Quản trị DISC Vietnam', 'info@khoinghiep.today', 'superadmin'),
('info', '$2b$10$AGWau8dQOLAHZFfbFB8Rie.dwXc1CH/5KaTtc0hZbJhFG8nM7lMei', 'Ban Quản trị DISC Vietnam', 'info@khoinghiep.today', 'superadmin');

-- Thành viên & Dự án mẫu
INSERT INTO members (name, tax_code, industry, tier, status, contact_name, contact_pos, email, phone, description, address) VALUES
('Công ty Cổ phần Công nghệ AI Doanh nghiệp Việt', '0109998888', 'Công nghệ thông tin - AI', 'Platinum', 'approved', 'Đỗ Minh Tuấn', 'Tổng Giám đốc', 'tuan.do@aiviet.vn', '0988123456', 'Chuyên phát triển các giải pháp AI Multi-Agent và chuyển đổi số cho doanh nghiệp vừa và nhỏ.', 'Khu Công nghệ cao Hòa Lạc, Hà Nội'),
('Quỹ Đầu tư & Ươm tạo Khởi nghiệp Họ Đỗ', '0108887777', 'Tài chính - Đầu tư', 'Platinum', 'approved', 'Đỗ Thành Trung', 'Chủ tịch Quỹ', 'trung.do@doinvest.vn', '0912888999', 'Quỹ chuyên đầu tư hạt giống (Seed round) và Series A cho các dự án khởi nghiệp đổi mới sáng tạo.', 'HT2 - Khu Biệt Thự Vườn Cam, Sơn Đồng, Hà Nội'),
('Dự án Nông nghiệp Thông minh AgriSmart', '0319997777', 'Nông nghiệp công nghệ cao', 'Gold', 'approved', 'Đỗ Thị Hương', 'Founder & CEO', 'huong.do@agrismart.vn', '0933777888', 'Ứng dụng IoT và cảm biến thông minh vào tối ưu hóa năng suất nhà kính và chuỗi cung ứng nông sản.', 'Quận 9, TP. Thủ Đức, TP. Hồ Chí Minh');

-- Bài viết mẫu
INSERT INTO posts (member_id, title, summary, body, type, status, contact_info) VALUES
(1, 'Tìm kiếm đối tác triển khai Trợ lý AI Doanh nghiệp cho chuỗi bán lẻ', 'AI Viet đang tìm kiếm đối tác tư vấn và triển khai phần mềm AI cho các hệ thống siêu thị & bán lẻ.', 'Chúng tôi phát triển giải pháp AI tự động phân tích dữ liệu bán hàng và chăm sóc khách hàng 24/7. Cần hợp tác với các đơn vị tư vấn chuyển đổi số.', 'Tìm đối tác hợp tác', 'approved', 'tuan.do@aiviet.vn | 0988 123 456'),
(2, 'Thông báo Chương trình Mở rộng Quỹ Đầu tư Hạt giống Khởi nghiệp Q3/2026', 'Quỹ DoInvest tài trợ từ $20,000 - $100,000 cho các nhóm dự án công nghệ, AI và thương mại số.', 'Dự án thuộc cộng đồng họ Đỗ (Đậu) Việt Nam và đối tác được ưu tiên hỗ trợ cố vấn chuyên gia 1-1, văn phòng làm việc và chuẩn bị hồ sơ gọi vốn chuyên nghiệp.', 'Gọi vốn / Đầu tư', 'approved', 'trung.do@doinvest.vn | 0912 888 999');

-- Sự kiện mẫu
INSERT INTO events (title, event_date, location, organizer, status) VALUES
('Diễn đàn Đổi mới Sáng tạo & Khởi nghiệp Họ Đỗ Việt Nam 2026', '2026-08-15', 'Trung tâm Hội nghị Quốc gia, Hà Nội', 'DISC Vietnam - Khoinghiep.today', 'upcoming'),
('Khóa Đào tạo Ứng dụng AI Multi-Agent & Chuyển đổi số Doanh nghiệp', '2026-08-22', 'Trực tuyến qua Zoom / Hybrid', 'Ban Đào tạo DISC Vietnam', 'upcoming'),
('Sự kiện Kết nối Đầu tư Pitch Day — Kết nối Dự án Khởi nghiệp & Nhà đầu tư', '2026-09-05', 'Khu Biệt Thự Vườn Cam, Sơn Đồng, Hà Nội', 'DISC Vietnam', 'upcoming');

-- Cấu hình AI mặc định
INSERT INTO ai_config (provider, model, is_active) VALUES ('openrouter', 'google/gemini-3-flash-preview', 1);
