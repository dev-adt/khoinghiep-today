import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';

export const Training = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('courses'); // courses, library
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Ứng dụng AI Multi-Agent trong Công việc & Kinh doanh 2026",
      category: "Công nghệ & AI",
      duration: "4 buổi (Online / Hybrid)",
      level: "Tất cả cấp độ",
      speaker: "Đỗ Minh Tuấn (Chuyên gia AI Multi-Agent, CEO AI Viet)",
      description: "Hướng dẫn thực chiến xây dựng trợ lý AI tự động hóa quy trình chăm sóc khách hàng, phân tích dữ liệu kinh doanh và sáng tạo nội dung truyền thông.",
      schedule: "Tối Thứ 3 & Thứ 5 (19:30 - 21:30)",
      badge: "Nổi bật"
    },
    {
      id: 2,
      title: "Kỹ năng Gọi vốn, Lập Hồ sơ Dự án & Pitching trước Nhà đầu tư",
      category: "Khởi nghiệp & Đầu tư",
      duration: "2 buổi intensive",
      level: "Nhóm Founder & Khởi nghiệp",
      speaker: "Đỗ Thành Trung (Chủ tịch Quỹ DoInvest)",
      description: "Xây dựng Pitch Deck chuyên nghiệp 10-slide, tính toán kế hoạch định giá tài chính, luyện tập phản biện câu hỏi hóc húa từ nhà đầu tư.",
      schedule: "Cuối tuần (Thứ 7 & Chủ nhật)",
      badge: "Khuyên dùng"
    },
    {
      id: 3,
      title: "Chuyển đổi số & Tối ưu hóa Quản trị Doanh nghiệp Vừa và Nhỏ",
      category: "Quản trị & Chuyển đổi số",
      duration: "3 buổi",
      level: "Cán bộ quản lý & Doanh nhân",
      speaker: "Ban Đào tạo DISC Vietnam",
      description: "Số hóa quy trình làm việc, quản trị tài chính dòng tiền, xây dựng hệ thống KPI & quản trị mục tiêu OKRs tự động.",
      schedule: "Thứ 6 hàng tuần"
    },
    {
      id: 4,
      title: "Marketing Số, Xây dựng Thương hiệu & Thương mại Điện tử",
      category: "Marketing & E-commerce",
      duration: "3 buổi",
      level: "Đội ngũ Marketing & Bán hàng",
      speaker: "Chuyên gia Truyền thông DISC",
      description: "Xây dựng kênh phân phối số, tiếp cận khách hàng tiềm năng qua mạng xã hội, tối ưu hóa tỷ lệ chuyển đổi cho thương hiệu.",
      schedule: "Thứ 4 hàng tuần"
    }
  ];

  const libraryResources = [
    {
      title: "Bộ Mẫu Pitch Deck Gọi Vốn Chuẩn Quốc Tế 2026 (PPTX)",
      category: "Tài nguyên Khởi nghiệp",
      format: "PowerPoint / PDF",
      downloads: "1,250+"
    },
    {
      title: "Khung Mô Hình Kinh Doanh Lean Business Model Canvas (Việt - Anh)",
      category: "Quản trị Dự án",
      format: "PDF / Word",
      downloads: "2,100+"
    },
    {
      title: "Cẩm Nang Ứng Dụng AI Multi-Agent Trong Doanh Nghiệp (DISC Vietnam)",
      category: "Tri thức AI",
      format: "Ebook PDF",
      downloads: "3,400+"
    },
    {
      title: "Mẫu Hợp Đồng Thỏa Thuận Đầu Tư Hạt Giống (SHA / SAFE Agreement)",
      category: "Pháp lý & Tài chính",
      format: "Docx",
      downloads: "980+"
    }
  ];

  const handleRegisterCourse = (course) => {
    setSelectedCourse(course);
    setRegisterSuccess(false);
  };

  return (
    <div className="public-body">
      <Navbar />

      <div style={{ position: 'fixed', top: '-10%', left: '-5%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0) 70%)', zIndex: -1, pointerEvents: 'none', borderRadius: '50%' }}></div>
      <div style={{ position: 'fixed', bottom: '-10%', right: '-5%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0) 70%)', zIndex: -1, pointerEvents: 'none', borderRadius: '50%' }}></div>

      <div className="public-container" style={{ marginTop: '3rem', marginBottom: '5rem' }}>
        
        {/* HEADER SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <i className="ti ti-school"></i> {t('training_badge')}
          </div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('training_title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '10px auto 0', lineHeight: '1.6' }}>
            {t('training_desc')}
          </p>

          {/* TABS SWITCHER */}
          <div style={{ display: 'inline-flex', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', padding: '4px', borderRadius: '99px', marginTop: '2rem' }}>
            <button 
              onClick={() => setActiveTab('courses')}
              style={{
                padding: '8px 24px',
                borderRadius: '99px',
                border: 'none',
                background: activeTab === 'courses' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'courses' ? '#fff' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <i className="ti ti-certificate"></i> {typeof t('tab_courses_count') === 'function' ? t('tab_courses_count')(courses.length) : `Khóa học (${courses.length})`}
            </button>
            <button 
              onClick={() => setActiveTab('library')}
              style={{
                padding: '8px 24px',
                borderRadius: '99px',
                border: 'none',
                background: activeTab === 'library' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'library' ? '#fff' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <i className="ti ti-books"></i> {typeof t('tab_library_count') === 'function' ? t('tab_library_count')(libraryResources.length) : `Thư viện (${libraryResources.length})`}
            </button>
          </div>
        </div>

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {courses.map((c) => (
              <div key={c.id} className="glass-card" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(220,38,38,0.15)', position: 'relative' }}>
                {c.badge && (
                  <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '9px', background: 'rgba(220,38,38,0.12)', color: 'var(--primary)', border: '1px solid rgba(220,38,38,0.3)', padding: '2px 8px', borderRadius: '99px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {c.badge}
                  </span>
                )}
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--amber-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px', marginBottom: '12px', lineHeight: '1.4' }}>{c.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>{c.description}</p>
                  
                  <div style={{ background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', border: '1px solid var(--border)' }}>
                    <div><strong><i className="ti ti-user-check"></i> Giảng viên / Cố vấn:</strong> {c.speaker}</div>
                    <div><strong><i className="ti ti-clock"></i> Thời lượng:</strong> {c.duration}</div>
                    <div><strong><i className="ti ti-calendar"></i> Lịch học:</strong> {c.schedule}</div>
                  </div>
                </div>

                <button 
                  onClick={() => handleRegisterCourse(c)}
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13px' }}
                >
                  <i className="ti ti-pencil"></i> {t('btn_register_course')}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* LIBRARY TAB */}
        {activeTab === 'library' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {libraryResources.map((res, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(245,158,11,0.2)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.12)', color: 'var(--amber-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    <i className="ti ti-file-download"></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--amber-dark)', textTransform: 'uppercase' }}>{res.category}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Format: {res.format}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' }}>{res.title}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '14px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}><i className="ti ti-download"></i> {typeof t('downloads_count') === 'function' ? t('downloads_count')(res.downloads) : `${res.downloads}`}</span>
                  <button 
                    onClick={() => alert(`Tải xuống miễn phí tài liệu: "${res.title}" thành công!`)}
                    style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--primary)', border: '1px solid rgba(220,38,38,0.2)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {t('btn_download')} <i className="ti ti-download"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* REGISTRATION MODAL */}
      {selectedCourse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,14,30,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{t('modal_register_title')}</h3>
              <button onClick={() => setSelectedCourse(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}><i className="ti ti-x"></i></button>
            </div>

            {registerSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <i className="ti ti-circle-check" style={{ fontSize: '48px', color: 'var(--emerald)', display: 'block', marginBottom: '12px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{t('modal_success_title')}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{t('modal_success_desc')}</p>
                <button onClick={() => setSelectedCourse(null)} className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '8px 24px' }}>{t('btn_complete')}</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setRegisterSuccess(true); }}>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>{selectedCourse.title}</div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>{t('label_full_name')}</label>
                  <input type="text" required placeholder="Ví dụ: Đỗ Văn Nam" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-strong)', outline: 'none', fontSize: '13px' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>{t('label_email_study')}</label>
                  <input type="email" required placeholder="name@company.com" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-strong)', outline: 'none', fontSize: '13px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>{t('label_phone_zalo')}</label>
                  <input type="tel" required placeholder="0987654321" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-strong)', outline: 'none', fontSize: '13px' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>{t('btn_submit_register')}</button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Training;
