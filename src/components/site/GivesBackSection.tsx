const campaigns = [
  {
    tag: "TRẺ EM",
    icon: "👗",
    title: "Tủ Quần Áo Cho Em",
    description:
      "Trao tặng trang phục sạch đẹp và dụng cụ học tập cho trẻ em vùng cao trước mùa tựu trường.",
    raised: "12.500.000đ",
    goal: "20.000.000đ",
    percent: 63,
    supporters: 342,
    daysLeft: 15,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "MÔI TRƯỜNG",
    icon: "♻️",
    title: "Xanh Hóa Thời Trang",
    description:
      "Tái chế vải thừa và thu gom quần áo cũ để giảm rác thải dệt may sau mỗi mùa thuê.",
    raised: "8.200.000đ",
    goal: "15.000.000đ",
    percent: 55,
    supporters: 218,
    daysLeft: 23,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "CỘNG ĐỒNG",
    icon: "✨",
    title: "Tự Tin Tỏa Sáng",
    description:
      "Hỗ trợ trang phục phỏng vấn và workshop phong thái cho phụ nữ đang tìm cơ hội việc làm.",
    raised: "5.800.000đ",
    goal: "10.000.000đ",
    percent: 58,
    supporters: 156,
    daysLeft: 31,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
  },
];

const impactStats = [
  { value: "1.247", label: "LƯỢT ỦNG HỘ" },
  { value: "26.500.000", label: "TỔNG ĐÃ QUYÊN (đ)" },
  { value: "890", label: "BỘ ĐỒ ĐÃ TRAO TẶNG" },
];

export function GivesBackSection() {
  return (
    <section className="csr-section" aria-labelledby="csr-title">
      <div className="csr-inner">
        <header className="csr-header">
          <h2 id="csr-title" className="csr-title">
            Thời trang có trách nhiệm
          </h2>
          <p className="csr-subtitle">
            Mỗi đơn thuê, một hành động ý nghĩa — 5% giá trị mỗi đơn được dành cho cộng đồng.
          </p>
        </header>

        <div className="csr-campaign-grid" aria-label="Danh sách chiến dịch gây quỹ xã hội">
          {campaigns.map((campaign) => (
            <article className="csr-card" key={campaign.title}>
              <figure className="csr-media">
                <img src={campaign.image} alt="" />
                <figcaption className="csr-tag">{campaign.tag}</figcaption>
              </figure>

              <div className="csr-card-body">
                <h3 className="csr-card-title">
                  <span aria-hidden="true">{campaign.icon}</span>
                  {campaign.title}
                </h3>
                <p className="csr-card-description">{campaign.description}</p>

                <div className="csr-progress-block">
                  <div
                    className="csr-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={campaign.percent}
                    aria-label={`${campaign.title} đã đạt ${campaign.percent}%`}
                  >
                    <span style={{ width: `${campaign.percent}%` }} />
                  </div>
                  <div className="csr-progress-meta">
                    <strong>{campaign.percent}%</strong>
                    <span>
                      {campaign.raised} / {campaign.goal}
                    </span>
                  </div>
                </div>

                <dl className="csr-card-stats">
                  <div>
                    <dt>Người ủng hộ</dt>
                    <dd>{campaign.supporters}</dd>
                  </div>
                  <div>
                    <dt>Ngày còn lại</dt>
                    <dd>{campaign.daysLeft}</dd>
                  </div>
                </dl>

                <div className="csr-actions">
                  <button className="csr-support-button" type="button">
                    ❤️ Ủng hộ ngay
                  </button>
                  <button
                    className="csr-share-button"
                    type="button"
                    aria-label={`Chia sẻ ${campaign.title}`}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="csr-stats-bar" aria-label="Số liệu tổng kết gây quỹ">
          {impactStats.map((stat) => (
            <div className="csr-impact" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
