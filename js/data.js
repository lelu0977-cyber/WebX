/* ============================================================
   WebX — data.js
   Cơ sở dữ liệu tập trung cho toàn bộ hệ thống website.
   Phong cách: Sáng tạo Xào Ý Tưởng (Cam đất & Xanh cyan, phác thảo tay)
   ============================================================ */

window.WEBNHANH_DATA = {
  /* --- Cấu hình thương hiệu --- */
  config: {
    brand: "WebX",
    tagline: "Website trọn gói cho hộ kinh doanh nhỏ",
    heroBadge: "🚀 Web cho quán nhỏ — xong trong 2 ngày",
    heroTitle: "Website cho quán của bạn — xong trong 2 ngày",
    heroIntro: "6 thứ bạn sở hữu khi có website: tạo uy tín, có khách hàng từ Google, tự động hóa bán hàng, trình bày sản phẩm/dịch vụ chuyên nghiệp, thu thập dữ liệu khách hàng, không phụ thuộc vào Facebook/ TikTok. Trả một lần trọn đời không phí thuê hàng tháng.",
    contact: {
      name: "Lê Thành Long",
      phone: "0325 477 523",
      phoneDisplay: "0325 477 523",
      phoneCall: "tel:+84325477523",
      zalo: "https://zaloapp.com/qr/p/1m2koedeqiy8z",
      email: "longlesinep114@gmail.com",
      address: "Hà Nội & Toàn quốc"
    },
    bank: {
      bin: "970407", // Techcombank (TCB)
      bankName: "Techcombank (Ngân hàng TMCP Kỹ thương Việt Nam)",
      account: "1104200601",
      accountDisplay: "1104 2006 01",
      name: "LE THANH LONG"
    },
    formspreeId: "mgaezbyr"
  },

  /* --- 6 Giá trị cốt lõi (Theo Hình ảnh 1: Hatched doodle style) --- */
  coreValues: [
    {
      id: "convenience",
      title: "THUẬN TIỆN",
      desc: "Giải pháp của sản phẩm phải thuận tiện khi sử dụng để giải quyết vấn đề của quán nhanh nhất.",
      icon: "clock24"
    },
    {
      id: "information",
      title: "THÔNG TIN",
      desc: "Đầy đủ thông tin, menu và giá minh bạch để giúp khách hàng đưa ra quyết định một cách thành công.",
      icon: "folder"
    },
    {
      id: "efficiency",
      title: "HIỆU QUẢ",
      desc: "Giúp mình cải thiện công việc, tăng lượng khách đặt bàn và giảm thời gian hoặc khó khăn khi tư vấn.",
      icon: "turnclock"
    },
    {
      id: "pricing",
      title: "GIÁ CẢ",
      desc: "Chi phí rõ ràng ngay từ đầu. Trả một lần sở hữu trọn đời, không phát sinh chi phí ẩn hay phí duy trì tháng.",
      icon: "piggybank"
    },
    {
      id: "choice",
      title: "SỰ LỰA CHỌN",
      desc: "Đa dạng phong cách thiết kế theo từng ngành nghề: quán cà phê, quán ăn, spa, tiệm tóc, gym, thời trang.",
      icon: "keypad"
    },
    {
      id: "design",
      title: "THIẾT KẾ",
      desc: "Giao diện độc đáo, tối ưu chuẩn điện thoại, tải siêu tốc và tích hợp sẵn nút bấm gọi Zalo trong 1 chạm.",
      icon: "geometry"
    }
  ],

  /* --- Lộ trình 4 bước — Tên lửa cất cánh (Theo Hình ảnh 2) --- */
  timelineSteps: [
    {
      step: 1,
      day: "Ngày 1",
      title: "KHỞI ĐỘNG & TIẾP NHẬN",
      desc: "Nhắn Zalo hoặc điền form kể rõ quán bạn cần gì. Chúng mình cùng trao đổi nhanh về phong cách mong muốn.",
      highlight: "Tư vấn 1:1 miễn phí"
    },
    {
      step: 2,
      day: "Ngày 2",
      title: "CHỌN MẪU & GỬI DỮ LIỆU",
      desc: "Bạn chọn mẫu website ưng ý và gửi: tên quán, hình ảnh chụp từ điện thoại, menu kèm giá món.",
      highlight: "Không cần biết lập trình"
    },
    {
      step: 3,
      day: "Ngày 3",
      title: "THIẾT KẾ & TINH CHỈNH",
      desc: "Chúng mình hoàn thiện website chạy thật, kết nối Google Maps, cấu hình Zalo tư vấn và mã QR thanh toán.",
      highlight: "Chuẩn 100% di động"
    },
    {
      step: 4,
      day: "Ngày 4",
      title: "NGHIỆM THU & BÀN GIAO",
      desc: "Kiểm tra website trên điện thoại của bạn, hướng dẫn cách tự đổi món/giá khi cần. Tên lửa chính thức cất cánh!",
      highlight: "Bảo hành trọn đời"
    }
  ],

  /* --- Bảng giá dịch vụ --- */
  pricingPackages: [
    {
      id: "basic",
      name: "Gói Cơ Bản",
      priceNumber: 1000000,
      price: "1.000.000 – 1.700.000đ",
      range: "Tùy theo số lượng trang & nội dung",
      time: "Giao trong 2 ngày",
      badge: "Phù hợp quán mới mở",
      featured: false,
      desc: "Dành cho quán ăn, quán cà phê, tiệm làm móng cần một trang giới thiệu gọn gàng, có menu và nút gọi ngay.",
      features: [
        "Website 1 trang phong cách hiện đại, chuẩn điện thoại",
        "Giới thiệu thông tin quán + menu/dịch vụ có giá chi tiết",
        "Tích hợp bản đồ chỉ đường Google Maps chính xác",
        "Nút gọi điện thoại & chat Zalo nổi trực tiếp 1 chạm",
        "Tối ưu tốc độ tải trang dưới 1.5 giây",
        "Miễn phí duy trì năm đầu tiên, không phí tháng"
      ]
    },
    {
      id: "full",
      name: "Gói Đầy Đủ",
      priceNumber: 2000000,
      price: "2.000.000 – 2.800.000đ",
      range: "Đầy đủ tính năng bán hàng & đặt lịch",
      time: "Giao trong 4 ngày",
      badge: "Phổ biến & Đầy đủ nhất",
      featured: true,
      desc: "Dành cho quán muốn nhận đơn đặt bàn, đặt lịch hẹn trực tuyến và xuất hiện đẹp mắt trên tìm kiếm Google.",
      features: [
        "Tất cả tính năng của Gói Cơ Bản",
        "Form đặt bàn / đặt lịch hẹn tự động báo về Zalo",
        "Giỏ hàng & tạo mã VietQR chuyển khoản tự động khớp đơn",
        "Tối ưu chuẩn SEO để tìm thấy trên Google khu vực",
        "Hỗ trợ chỉnh sửa nội dung theo yêu cầu 2 lần",
        "Bộ tài liệu & video hướng dẫn tự cập nhật menu"
      ]
    },
    {
      id: "custom",
      name: "Gói Nâng Cao",
      priceNumber: 3400000,
      price: "3.400.000 – 4.000.000đ",
      range: "Thiết kế độc quyền & đa chi nhánh",
      time: "Giao trong 5-7 ngày",
      badge: "Theo yêu cầu riêng",
      featured: false,
      desc: "Dành cho chuỗi cửa hàng, phòng khám, studio cần thiết kế độc quyền riêng biệt và nhiều chi nhánh.",
      features: [
        "Tất cả tính năng của Gói Đầy Đủ",
        "Thiết kế giao diện độc quyền theo nhận diện thương hiệu",
        "Quản lý nhiều chi nhánh trên cùng 1 website",
        "Tích hợp chatbot thông minh tư vấn 24/7",
        "Hỗ trợ viết 5 bài viết chuẩn SEO giới thiệu quán",
        "Đồng hành hỗ trợ kỹ thuật ưu tiên 24/7 trong 12 tháng"
      ]
    }
  ],

  /* --- Danh sách Website mẫu & Sản phẩm dịch vụ --- */
  products: [
    {
      id: "cafe",
      code: "DEMO-JEWELRY",
      name: "Nhẫn Bạc Midi Ring — KaT Jewelry",
      category: "Trang sức / Phụ kiện",
      categorySlug: "jewelry",
      priceNumber: 3800000,
      price: "3.800.000đ",
      tag: "Trang sức / Phụ kiện",
      badge: "Signature — Bán chạy",
      desc: "Trang sức Bạc Ý 925 cao cấp & Midi Ring đính đá sang trọng, bảng tra size tự động, thanh toán VietQR 24/7.",
      fullDesc: "Mẫu website thương mại điện tử chuyên biệt cho cửa hàng trang sức cao cấp, nhẫn bạc 925, Midi Ring. Thiết kế sang trọng quý phái phong cách KaT Jewelry với bộ lọc kích thước chuẩn, giỏ hàng popup, tích hợp thanh toán VietQR và hệ thống quản trị đơn hàng đầy đủ.",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
      ],
      demoUrl: "demo-nhan-bac/",
      features: [
        "Bộ sưu tập nhẫn bạc 925 đính đá cao cấp chuẩn phong cách KaT Jewelry",
        "Công cụ chọn size nhẫn và bảng hướng dẫn đo size trực quan",
        "Hệ thống giỏ hàng mini drawer và thanh toán VietQR tự động",
        "Backend Laravel quản trị đơn hàng & thống kê doanh thu",
        "Tối ưu trải nghiệm mua sắm siêu mượt trên điện thoại di động",
        "Hỗ trợ tư vấn trực tiếp qua Zalo / Hotline tích hợp sẵn"
      ],
      deliveryDays: 2,
      viewsCount: 1850
    },
    {
      id: "spa",
      code: "DEMO-SPA",
      name: "Serenity Spa & Clinic",
      category: "Spa / Salon / Làm đẹp",
      categorySlug: "spa",
      priceNumber: 1500000,
      price: "1.500.000đ",
      tag: "Spa / Salon / Làm đẹp",
      badge: "Sang trọng & Tinh tế",
      desc: "Bảng giá liệu trình minh bạch, đặt lịch hẹn nhanh qua form hoặc Zalo, bộ sưu tập hình ảnh thư giãn.",
      fullDesc: "Mẫu website thiết kế trang nhã cho tiệm spa, salon tóc, tiệm nail và thẩm mỹ viện. Khách hàng dễ dàng xem bảng giá từng liệu trình, hình ảnh trước/sau và đặt lịch hẹn thư giãn chỉ trong vài giây.",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=75",
      gallery: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=75",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=75",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=75"
      ],
      demoUrl: "demo-spa/",
      features: [
        "Danh mục liệu trình chăm sóc da, massage, gội đầu dưỡng sinh",
        "Bảng giá công khai từng gói dịch vụ và thời lượng",
        "Form đặt lịch hẹn thông minh chọn ngày giờ tiện lợi",
        "Khu vực giới thiệu chuyên viên & chứng chỉ",
        "Đánh giá của khách hàng thân thiết (Social Proof)",
        "Nút gọi tư vấn và định vị cơ sở trên Google Maps"
      ],
      deliveryDays: 2,
      viewsCount: 1180
    },
    {
      id: "gym",
      code: "DEMO-GYM",
      name: "IronPulse Fitness & Gym",
      category: "Phòng gym / Yoga / Thể thao",
      categorySlug: "gym",
      priceNumber: 1500000,
      price: "1.500.000đ",
      tag: "Phòng gym / Yoga",
      badge: "Năng động & Mạnh mẽ",
      desc: "Gói tập hội viên, lịch lớp học Yoga/Boxing, form đăng ký tập thử miễn phí 1 buổi ngay trên trang.",
      fullDesc: "Mẫu website tràn đầy năng lượng dành cho phòng tập gym, yoga studio, trung tâm pilates và câu lạc bộ võ thuật. Giúp thu hút hội viên mới bằng lịch học trực quan và chương trình đăng ký tập thử 1-click.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=75",
      gallery: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=75",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=75",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=75"
      ],
      demoUrl: "demo-gym/",
      features: [
        "Trình bày các gói tập theo tháng/năm kèm quyền lợi",
        "Thời khóa biểu các lớp Yoga, Zumba, Boxing theo ngày",
        "Đăng ký nhận vé tập thử miễn phí qua form",
        "Profile huấn luyện viên cá nhân (PT) chuyên nghiệp",
        "Hình ảnh dàn máy tập hiện đại và không gian phòng thay đồ",
        "Hotline tư vấn và chỉ đường đến phòng tập"
      ],
      deliveryDays: 2,
      viewsCount: 960
    }
  ],

  /* --- Danh mục bài viết & Cẩm nang kinh doanh --- */
  articles: [
    {
      id: "kinh-nghiem-lam-web-quan-ca-phe",
      title: "Kinh nghiệm làm website quán cà phê giúp tăng 300% lượng khách đặt bàn 2026",
      slug: "kinh-nghiem-lam-web-quan-ca-phe",
      category: "Cẩm nang kinh doanh",
      date: "15/09/2026",
      readTime: "5 phút đọc",
      author: "Lê Thành Long",
      img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=75",
      excerpt: "Nhiều chủ quán nghĩ chỉ cần trang Facebook là đủ. Nhưng trên thực tế, một website 1 trang tinh gọn có menu rõ giá và nút gọi Zalo lại là vũ khí hút khách mạnh nhất.",
      content: `
        <p class="lead">Trong thời buổi khách hàng quen tìm kiếm quán cà phê qua Google Maps và TikTok, việc sở hữu một trang web riêng không còn là đặc quyền của các chuỗi lớn như Highlands hay Phúc Long. Quán nhỏ của bạn hoàn toàn có thể tạo ấn tượng chuyên nghiệp vượt trội chỉ với một website 1 trang đơn giản.</p>
        
        <h3>1. Khách hàng ghé web cần thấy gì đầu tiên?</h3>
        <p>Họ chỉ cần 3 thứ trong vòng 5 giây đầu tiên khi mở bằng điện thoại:</p>
        <ul>
          <li><strong>Thực đơn có giá niêm yết:</strong> Khách ngại nhất là vào quán mà không biết giá bao nhiêu. Menu rõ ràng giúp họ tự tin rủ bạn bè ghé quán.</li>
          <li><strong>Hình ảnh không gian thật:</strong> Bàn ghế có ổ cắm để làm việc không? Góc check-in chụp hình có đẹp không?</li>
          <li><strong>Định vị vị trí và nút gọi:</strong> Khách bấm một chạm là mở Google Maps chỉ đường hoặc gọi đặt bàn trước.</li>
        </ul>

        <div class="note-box">
          <p>💡 <em>Mẹo nhỏ:</em> Đừng bắt khách tải file PDF menu nặng cả chục MB về máy. Hãy dàn menu ngay trên giao diện web để vừa mở là xem được liền!</p>
        </div>

        <h3>2. Vì sao nút Zalo 1 chạm lại hiệu quả gấp 5 lần form phức tạp?</h3>
        <p>Người Việt Nam có thói quen nhắn tin Zalo vì nhanh và có người thật trả lời. Khi khách bấm nút Zalo trên web, cuộc trò chuyện mở ra ngay lập tức, bạn có ngay số điện thoại khách để chăm sóc và giữ chân cho những lần ghé sau.</p>

        <h3>3. Chi phí và thời gian làm thế nào là hợp lý?</h3>
        <p>Hộ kinh doanh không nên chi hàng chục triệu cho các hệ thống cồng kềnh. Một website tối ưu trọn gói chỉ nên dao động từ <strong>1 đến 2.5 triệu đồng</strong>, hoàn thành trong 2-3 ngày là bạn đã có thể đưa vào phục vụ kinh doanh ngay lập tức.</p>
      `
    },
    {
      id: "5-ly-do-khong-nen-nuoi-web-hang-thang",
      title: "5 lý do hộ kinh doanh không nên tốn 500k/tháng nuôi web trên các nền tảng đóng",
      slug: "5-ly-do-khong-nen-nuoi-web-hang-thang",
      category: "Tư vấn công nghệ",
      date: "10/09/2026",
      readTime: "4 phút đọc",
      author: "Lê Thành Long",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=75",
      excerpt: "Nhiều bên chào mời website giá rẻ chỉ vài chục ngàn, nhưng thực chất bạn phải đóng phí duy trì hàng tháng liên tục. Sau 2 năm, số tiền đó đủ để bạn mở thêm một quầy hàng mới.",
      content: `
        <p class="lead">Khi mới bắt đầu kinh doanh, bài toán dòng tiền là quan trọng nhất. Mỗi tháng phải gánh thêm tiền thuê nền tảng website từ 300.000đ đến 600.000đ trong khi nhu cầu của quán chỉ cần giới thiệu món ăn và địa chỉ là sự lãng phí rất lớn.</p>

        <h3>1. Bạn không thực sự sở hữu website của mình</h3>
        <p>Ở các nền tảng đóng trả phí hàng tháng, nếu tháng nào bạn quên gia hạn, website sẽ lập tức bị khóa. Toàn bộ hình ảnh, dữ liệu và công sức quảng bá trước đó đều biến mất.</p>

        <h3>2. Chi phí cộng dồn khổng lồ theo thời gian</h3>
        <p>Hãy làm một phép tính đơn giản: 400.000đ/tháng x 12 tháng = 4.800.000đ mỗi năm. Sau 3 năm, bạn đã chi gần 15 triệu đồng chỉ cho một trang giới thiệu cơ bản!</p>

        <h3>3. Web tĩnh tốc độ cao — Xu hướng của các hộ kinh doanh thông minh</h3>
        <p>Chỉ cần trả một lần duy nhất từ 1 – 2 triệu, website là tài sản thuộc sở hữu trọn đời của bạn. Mã nguồn nhẹ, chạy mượt mà, không sợ virus phá hoại và hoàn toàn không có hóa đơn định kỳ mỗi tháng.</p>
      `
    },
    {
      id: "huong-dan-chuan-bi-hinh-anh-menu-dien-thoai",
      title: "Hướng dẫn tự chụp hình menu & không gian quán đẹp lung linh chỉ bằng điện thoại",
      slug: "huong-dan-chuan-bi-hinh-anh-menu-dien-thoai",
      category: "Mẹo thực chiến",
      date: "05/09/2026",
      readTime: "6 phút đọc",
      author: "Lê Thành Long",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=75",
      excerpt: "Bạn không cần thuê thợ chụp ảnh đắt đỏ. Chỉ với chiếc smartphone và 3 nguyên tắc ánh sáng cơ bản, bạn sẽ có ngay bộ ảnh xịn sò để đưa lên website.",
      content: `
        <p class="lead">Hình ảnh thật của quán bao giờ cũng tạo được niềm tin mạnh mẽ hơn ảnh mạng stock. Dưới đây là 3 mẹo đơn giản để bạn tự chụp menu và không gian quán cực đẹp.</p>
        
        <h3>Mẹo 1: Tận dụng ánh sáng tự nhiên gần cửa sổ</h3>
        <p>Khoảng thời gian từ 8h - 10h sáng hoặc 3h - 5h chiều là lúc ánh sáng mềm nhất. Đặt ly nước hoặc dĩa thức ăn cạnh cửa sổ, tắt đèn trần vàng để màu sắc món ăn lên trung thực nhất.</p>

        <h3>Mẹo 2: Góc chụp 45 độ và góc từ trên xuống (Flatlay)</h3>
        <p>Góc 45 độ là góc nhìn tự nhiên của khách khi ngồi tại bàn. Góc chụp thẳng từ trên xuống (90 độ) rất phù hợp để chụp cả combo đồ uống kèm bánh ngọt.</p>

        <h3>Mẹo 3: Lau sạch ống kính camera điện thoại</h3>
        <p>Nghe tưởng chừng đơn giản nhưng 90% bức ảnh bị mờ đục là do camera dính mồ hôi tay. Chỉ cần dùng vạt áo hoặc khăn giấy lau sạch trước khi bấm máy, ảnh sẽ trong trẻo bất ngờ!</p>
      `
    },
    {
      id: "toi-uu-google-maps-cho-quan",
      title: "Bí quyết đưa quán của bạn lên top 1 Google Maps và hút khách địa phương",
      slug: "toi-uu-google-maps-cho-quan",
      category: "Marketing địa phương",
      date: "28/08/2026",
      readTime: "5 phút đọc",
      author: "Lê Thành Long",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=75",
      excerpt: "Khi du khách hoặc người dân xung quanh tìm 'quán cafe gần đây', làm sao để quán bạn hiện ra đầu tiên? Đây là những việc cần làm ngay.",
      content: `
        <p class="lead">Google Maps là nguồn khách hàng miễn phí và bền vững nhất cho bất kỳ quán ăn hay dịch vụ địa phương nào. Khi liên kết Google Maps với một website có menu rõ ràng, điểm uy tín của quán trên Google sẽ tăng vọt.</p>
        
        <h3>Những việc cần làm ngay:</h3>
        <ol>
          <li>Xác minh hồ sơ Google Business Profile đầy đủ tên quán, số điện thoại, giờ mở cửa.</li>
          <li>Thêm liên kết website vào phần Trang web của hồ sơ quán.</li>
          <li>Nhờ 10-20 khách quen đầu tiên để lại đánh giá 5 sao kèm hình ảnh thật.</li>
          <li>Cập nhật hình ảnh món mới lên Google Maps mỗi tuần một lần.</li>
        </ol>
      `
    }
  ],

  /* --- Phản hồi từ khách hàng (Social Proof) --- */
  testimonials: [
    {
      name: "Chị Thảo My",
      role: "Quản lý KaT Jewelry — Hoàn Kiếm, Hà Nội",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      content: "Từ ngày có web bán nhẫn bạc với tính năng chọn size và quét mã VietQR tự động, khách đặt mua qua Zalo và web nhanh hơn hẳn. Long làm web rất có gu, hình ảnh trang sức lên sáng bóng, chuyên nghiệp và tỷ lệ chốt đơn tăng vượt mong đợi!",
      rating: 5
    },
    {
      name: "Anh Hoàng Bách",
      role: "Chủ phòng tập IronPulse Gym — Cầu Giấy, Hà Nội",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
      content: "Long hỗ trợ cực kỳ nhiệt tình. Mình không rành công nghệ, chỉ gửi bảng giá gói tập với vài tấm ảnh phòng gym qua Zalo, hôm sau đã thấy web chạy mượt mà. Khách khu vực Cầu Giấy tìm thấy trên Google và đăng ký tập thử tăng đều đặn.",
      rating: 5
    },
    {
      name: "Chị Ngọc Lan",
      role: "Chủ Serenity Spa & Clinic — Đống Đa, Hà Nội",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
      content: "Ưng nhất là tính năng form đặt lịch hẹn chọn tình trạng da báo thẳng về email và Zalo, không phải đóng phí thuê hàng tháng. Khách đến spa khen giao diện xanh ngọc nhẹ nhàng thư thái. Làm trọn gói giá tốt mà dịch vụ của WebX quá chu đáo!",
      rating: 5
    }
  ],

  /* --- Cơ sở tri thức cho Chatbot tư vấn 24/7 --- */
  chatbotKB: [
    {
      keywords: ["giá", "gia bao", "bao nhiêu", "bao nhieu", "tiền", "phí bao", "chi phí", "gia ca"],
      answer: "Dạ! Gói Cơ Bản từ 1.000.000đ – 1.700.000đ. Gói Đầy Đủ từ 2.000.000đ – 2.800.000đ. Gói Nâng Cao từ 3.400.000đ – 4.000.000đ. Giá báo trước rõ ràng, trả một lần trọn đời và hoàn toàn không có phí tháng phát sinh ạ."
    },
    {
      keywords: ["bao lâu", "bao lau", "mấy ngày", "may ngay", "thời gian", "khi nào xong", "nhanh không"],
      answer: "Dạ Gói Cơ Bản chỉ mất 2 ngày là có web chạy thật. Gói Đầy Đủ mất 4 ngày. Thời gian tính từ khi anh/chị gửi đủ hình ảnh và menu quán cho em ạ."
    },
    {
      keywords: ["tháng", "thang", "phí tháng", "thuê bao", "định kỳ", "hàng năm", "duy trì"],
      answer: "Dạ bên em KHÔNG thu phí hàng tháng! Anh/chị trả 1 lần duy nhất là sở hữu website vĩnh viễn, khác hẳn các nền tảng bắt đóng 300k - 500k mỗi tháng ạ."
    },
    {
      keywords: ["công nghệ", "cong nghe", "không biết", "khong biet", "rành", "khó dùng"],
      answer: "Dạ anh/chị không cần biết gì về công nghệ cả! Anh/chị chỉ cần gửi 3 thứ qua Zalo: Tên quán, hình ảnh chụp từ điện thoại và menu. Còn lại em làm trọn gói từ A đến Z ạ."
    },
    {
      keywords: ["hình", "hinh anh", "menu", "nội dung", "noi dung", "chụp ảnh"],
      answer: "Hình ảnh anh/chị cứ dùng điện thoại chụp góc sáng là được rồi ạ. Menu chưa có file thiết kế thì chỉ cần chụp tờ giấy menu cũ hoặc nhắn chữ qua Zalo, em sẽ dàn trang đẹp mắt lên web cho mình."
    },
    {
      keywords: ["mẫu", "mau", "xem trước", "demo", "tham khảo", "ngành"],
      answer: "Em có sẵn các website demo chạy thật theo từng ngành: Nhẫn Bạc KaT Jewelry (trang sức/phụ kiện), Serenity Spa (làm đẹp/salon), IronPulse Gym (thể thao/yoga). Anh/chị có thể bấm vào mục 'Website mẫu' trên thanh menu để xem thử ngay ạ!"
    },
    {
      keywords: ["google", "seo", "tìm kiếm", "tim kiem", "maps", "bản đồ"],
      answer: "Dạ có ạ! Website được tối ưu để Google và Google Maps đọc được chuẩn xác: Tên quán, ngành nghề, địa chỉ, số điện thoại, giúp khách xung quanh tìm là thấy ngay."
    },
    {
      keywords: ["thanh toán", "thanh toan", "trả tiền", "tra tien", "cọc", "chuyển khoản", "qr", "quet ma"],
      answer: "Dạ anh/chị vào trang 'Thanh toán', chọn gói dịch vụ rồi quét mã VietQR tự động. Tiền vào là đơn tự chuyển sang Đã thanh toán, em sẽ gọi điện xác nhận và bắt tay vào làm ngay trong hôm nay ạ."
    },
    {
      keywords: ["zalo", "số", "so dien thoai", "liên hệ", "lien he", "hotline"],
      answer: "Dạ số Zalo và Hotline trực tiếp của em là 0325 477 523 (Lê Thành Long). Anh/chị nhắn qua Zalo lúc nào em cũng trả lời ngay ạ!"
    },
    {
      keywords: ["cập nhật", "cap nhat", "sửa", "sua", "đổi giá", "thay món"],
      answer: "Dạ em có tài liệu và video hướng dẫn cực dễ để anh/chị tự sửa giá hoặc thêm món. Nếu bận quá, anh/chị cứ nhắn Zalo cho em, em hỗ trợ cập nhật giúp hoàn toàn miễn phí ạ."
    }
  ]
};

window.WEBX_DATA = window.WEBNHANH_DATA;

