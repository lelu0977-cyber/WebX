/* ============================================================
   WebX — app.js
   Logic tương tác giao diện, hiển thị dữ liệu & Chatbot 24/7
   ============================================================ */

(function () {
  'use strict';

  const data = window.WEBNHANH_DATA;
  if (!data) return;

  // Tiện ích chọn phần tử DOM
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Toast thông báo
  window.showToast = function (message, duration = 3000) {
    let toast = $('#global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>✨ ' + message + '</span>';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  /* ---------- SVG ICONS HATCHED DOODLE (Theo Hình ảnh 1) ---------- */
  const svgIcons = {
    clock24: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-orange" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#e85d26" stroke-width="2.5" />
          </pattern>
        </defs>
        <circle cx="50" cy="50" r="42" fill="url(#hatch-orange)" stroke="#2a2e37" stroke-width="3.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#38a9d1" stroke-width="1.5" stroke-dasharray="4,3" />
        <circle cx="50" cy="50" r="28" fill="#ffffff" stroke="#2a2e37" stroke-width="3" />
        <text x="50" y="58" font-family="'Be Vietnam Pro', sans-serif" font-size="22" font-weight="900" fill="#e85d26" text-anchor="middle">24</text>
        <path d="M50 16 L50 22 M50 78 L50 84 M16 50 L22 50 M78 50 L84 50" stroke="#2a2e37" stroke-width="3" stroke-linecap="round" />
      </svg>
    `,
    folder: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-folder" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#e85d26" stroke-width="2.5" />
          </pattern>
        </defs>
        <path d="M18 34 L38 34 L46 42 L82 42 C85 42 88 45 88 48 L82 78 C82 82 78 84 74 84 L18 84 C14 84 12 80 12 76 L12 40 C12 36 15 34 18 34 Z" 
              fill="url(#hatch-folder)" stroke="#2a2e37" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M12 44 L84 44" stroke="#38a9d1" stroke-width="2.5" stroke-dasharray="3,3" />
        <path d="M26 26 L48 26 L54 34 L78 34" fill="none" stroke="#2a2e37" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
    turnclock: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-turn" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#e85d26" stroke-width="2" />
          </pattern>
        </defs>
        <path d="M78 35 C72 22 58 14 44 16 C28 18 16 32 16 48 C16 66 30 80 48 80" 
              fill="none" stroke="#2a2e37" stroke-width="4.5" stroke-linecap="round" />
        <polygon points="84,20 86,40 68,36" fill="#38a9d1" stroke="#2a2e37" stroke-width="3" />
        <circle cx="58" cy="58" r="24" fill="url(#hatch-turn)" stroke="#2a2e37" stroke-width="3" />
        <circle cx="58" cy="58" r="14" fill="#ffffff" stroke="#2a2e37" stroke-width="2" />
        <polyline points="58,50 58,58 64,62" fill="none" stroke="#e85d26" stroke-width="3" stroke-linecap="round" />
      </svg>
    `,
    piggybank: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-piggy" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#e85d26" stroke-width="2.2" />
          </pattern>
        </defs>
        <ellipse cx="50" cy="54" rx="34" ry="24" fill="url(#hatch-piggy)" stroke="#2a2e37" stroke-width="3.5" />
        <circle cx="50" cy="54" r="15" fill="#ffffff" stroke="#38a9d1" stroke-width="2.5" />
        <text x="50" y="60" font-family="'Be Vietnam Pro', sans-serif" font-size="16" font-weight="900" fill="#e85d26" text-anchor="middle">$</text>
        <path d="M22 48 L14 42 L14 54 Z" fill="#e85d26" stroke="#2a2e37" stroke-width="3" />
        <path d="M74 38 L84 34 L80 46" fill="#e85d26" stroke="#2a2e37" stroke-width="3" />
        <rect x="30" y="74" width="8" height="12" rx="3" fill="#2a2e37" />
        <rect x="62" y="74" width="8" height="12" rx="3" fill="#2a2e37" />
        <circle cx="68" cy="46" r="3" fill="#2a2e37" />
      </svg>
    `,
    keypad: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-hand" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#e85d26" stroke-width="2" />
          </pattern>
        </defs>
        <!-- Khung số keypad -->
        <rect x="30" y="16" width="10" height="10" rx="2" fill="#ffffff" stroke="#2a2e37" stroke-width="2.5" />
        <rect x="46" y="16" width="10" height="10" rx="2" fill="#38a9d1" stroke="#2a2e37" stroke-width="2.5" />
        <rect x="62" y="16" width="10" height="10" rx="2" fill="#ffffff" stroke="#2a2e37" stroke-width="2.5" />
        <rect x="30" y="32" width="10" height="10" rx="2" fill="#ffffff" stroke="#2a2e37" stroke-width="2.5" />
        <rect x="46" y="32" width="10" height="10" rx="2" fill="#e85d26" stroke="#2a2e37" stroke-width="2.5" />
        <rect x="62" y="32" width="10" height="10" rx="2" fill="#ffffff" stroke="#2a2e37" stroke-width="2.5" />
        <!-- Bàn tay trỏ ngón vẽ tay -->
        <path d="M52 24 L52 46 C52 48 55 52 56 56 L62 64 C64 68 64 74 62 82 L42 82 C40 76 38 70 42 62 L46 54 L46 36 C46 32 52 30 52 24 Z" 
              fill="url(#hatch-hand)" stroke="#2a2e37" stroke-width="3" stroke-linejoin="round"/>
      </svg>
    `,
    geometry: `
      <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch-geo" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#e85d26" stroke-width="2.2" />
          </pattern>
        </defs>
        <!-- Hình vuông gạch sọc -->
        <rect x="18" y="20" width="26" height="26" rx="4" fill="url(#hatch-geo)" stroke="#2a2e37" stroke-width="3" />
        <!-- Hình lục giác -->
        <polygon points="68,18 82,26 82,42 68,50 54,42 54,26" fill="#ffffff" stroke="#2a2e37" stroke-width="3" />
        <!-- Hình tam giác -->
        <polygon points="31,58 48,86 14,86" fill="#ffffff" stroke="#38a9d1" stroke-width="3.5" />
        <!-- Hình tròn gạch sọc -->
        <circle cx="70" cy="72" r="16" fill="url(#hatch-geo)" stroke="#2a2e37" stroke-width="3" />
      </svg>
    `
  };

  /* ---------- KHỞI TẠO CHUNG ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderValues();
    renderTimeline();
    renderDemos();
    renderPricing();
    renderTestimonials();
    renderArticles();
    initQuoteForm();
    initChatbot();
    initZaloQRModal();

    // Trang Sản Phẩm
    if ($('#catalog-grid')) {
      initCatalogPage();
    }

    // Trang Chi Tiết Sản Phẩm
    if ($('#product-detail-view')) {
      initProductDetailPage();
    }

    // Trang Tin Tức Chi Tiết
    if ($('#article-detail-view')) {
      initArticleDetailPage();
    }
  });

  /* ---------- NAVBAR & MOBILE MENU ---------- */
  function initNav() {
    const nav = $('.navbar');
    const toggle = $('.nav-toggle');
    const links = $('.nav-links');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    });

    toggle?.addEventListener('click', () => {
      links?.classList.toggle('open');
    });

    $$('.nav-links a').forEach(a => {
      a.addEventListener('click', () => links?.classList.remove('open'));
    });
  }

  /* ---------- RENDER 6 GIÁ TRỊ CỐT LÕI (Hình 1) ---------- */
  function renderValues() {
    const wrap = $('#values-grid');
    if (!wrap) return;

    wrap.innerHTML = data.coreValues.map(v => `
      <div class="value-card">
        <div class="value-icon-box">
          ${svgIcons[v.icon] || ''}
        </div>
        <h3 class="value-title">${v.title}</h3>
        <p class="value-desc">${v.desc}</p>
      </div>
    `).join('');
  }

  /* ---------- RENDER LỘ TRÌNH 4 BƯỚC (Hình 2) ---------- */
  function renderTimeline() {
    const wrap = $('#timeline-steps-grid');
    if (!wrap) return;

    wrap.innerHTML = data.timelineSteps.map(s => `
      <div class="timeline-step-card">
        <div class="step-header">
          <div class="step-number-circle">${s.step}</div>
          <div>
            <div class="step-day-tag">${s.day}</div>
            <h4 class="step-title">${s.title}</h4>
          </div>
        </div>
        <p class="step-desc">${s.desc}</p>
        <span class="step-highlight">✦ ${s.highlight}</span>
      </div>
    `).join('');
  }

  /* ---------- RENDER DEMOS TRÊN TRANG CHỦ ---------- */
  function renderDemos() {
    const wrap = $('#demos-grid');
    if (!wrap) return;

    wrap.innerHTML = data.products.slice(0, 3).map(p => `
      <div class="demo-card">
        <div class="demo-thumb-wrap">
          <img src="${p.img}" alt="${p.name}" class="demo-thumb" loading="lazy" />
          <span class="demo-tag-badge">${p.tag}</span>
        </div>
        <div class="demo-body">
          <h3 class="demo-name">${p.name}</h3>
          <p class="demo-desc">${p.desc}</p>
          <div class="demo-meta">
            <span class="demo-price">${p.price}</span>
            <span class="demo-time">⏱ ${p.deliveryDays} ngày bàn giao</span>
          </div>
          <div class="demo-actions">
            <a href="${p.demoUrl}" target="_blank" class="btn btn-ghost btn-sm">Xem Demo ↗</a>
            <a href="chi-tiet-san-pham.html?id=${p.id}" class="btn btn-primary btn-sm">Chi tiết & Đặt</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ---------- RENDER BẢNG GIÁ ---------- */
  function renderPricing() {
    const wrap = $('#pricing-grid');
    if (!wrap) return;

    wrap.innerHTML = data.pricingPackages.map(pkg => `
      <div class="pricing-card ${pkg.featured ? 'featured' : ''}">
        ${pkg.featured ? '<div class="pricing-badge-top">Phổ biến nhất</div>' : ''}
        <h3 class="pricing-name">${pkg.name}</h3>
        <div class="pricing-amount">${pkg.price}</div>
        <div class="pricing-range">${pkg.range}</div>
        <div class="pricing-time">⚡ ${pkg.time}</div>
        <p class="pricing-desc">${pkg.desc}</p>
        <ul class="pricing-features">
          ${pkg.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <a href="#contact" class="btn ${pkg.featured ? 'btn-primary' : 'btn-ghost'}" data-choose-pkg="${pkg.name}">
          Chọn ${pkg.name}
        </a>
      </div>
    `).join('');

    // Sự kiện khi bấm "Chọn gói"
    $$('[data-choose-pkg]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pkgName = btn.getAttribute('data-choose-pkg');
        const sel = $('#quote-package');
        if (sel) {
          sel.value = pkgName;
        }
      });
    });
  }

  /* ---------- RENDER ĐÁNH GIÁ (TESTIMONIALS) ---------- */
  function renderTestimonials() {
    const wrap = $('#testimonials-grid');
    if (!wrap) return;

    wrap.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-content">“${t.content}”</p>
        <div class="testimonial-author">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" />
          <div class="testimonial-info">
            <h5>${t.name}</h5>
            <p>${t.role}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ---------- RENDER BÀI VIẾT TIN TỨC ---------- */
  function renderArticles() {
    const wrap = $('#articles-grid');
    if (!wrap) return;

    wrap.innerHTML = data.articles.slice(0, 3).map(a => `
      <div class="article-card">
        <div class="article-thumb-wrap">
          <img src="${a.img}" alt="${a.title}" class="article-thumb" loading="lazy" />
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span class="article-tag">${a.category}</span>
            <span>• ${a.date}</span>
          </div>
          <h3 class="article-title">${a.title}</h3>
          <p class="article-excerpt">${a.excerpt}</p>
          <a href="chi-tiet-tin-tuc.html?slug=${a.slug}" class="article-link">Đọc bài viết →</a>
        </div>
      </div>
    `).join('');
  }

  /* ---------- FORM BÁO GIÁ LIÊN HỆ ---------- */
  function initQuoteForm() {
    const form = $('#quote-form');
    if (!form) return;

    // Đổ danh sách gói vào select
    const sel = $('#quote-package');
    if (sel && sel.children.length <= 1) {
      data.pricingPackages.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name + ' (' + p.price + ')';
        sel.appendChild(opt);
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#quote-name')?.value.trim();
      const phone = $('#quote-phone')?.value.trim();
      const pkg = $('#quote-package')?.value;
      const industry = $('#quote-industry')?.value.trim();
      const timeline = $('#quote-timeline')?.value;
      const note = $('#quote-note')?.value.trim();
      const btnSubmit = form.querySelector('button[type="submit"]');

      if (!name || !phone) {
        showToast('Vui lòng nhập họ tên và số điện thoại để em tiện liên hệ nhé!');
        return;
      }

      const origBtnText = btnSubmit ? btnSubmit.textContent : '';
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = '⏳ Đang gửi yêu cầu...';
      }

      // 1. Lưu trữ cục bộ vào danh sách khách hàng quản trị
      const custStore = JSON.parse(localStorage.getItem('wn_customers') || '[]');
      const newCust = {
        id: Date.now(),
        name,
        phone,
        zalo: phone,
        email: 'longlesinep114@gmail.com',
        package: pkg || 'Tư vấn chung',
        industry: industry || 'Chưa rõ',
        timeline: timeline || 'Sớm nhất',
        note: note || '',
        created_at: new Date().toISOString()
      };
      custStore.push(newCust);
      localStorage.setItem('wn_customers', JSON.stringify(custStore));

      // 2. Gửi tự động về email: longlesinep114@gmail.com
      try {
        await fetch('https://formsubmit.co/ajax/longlesinep114@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'Họ và tên khách hàng': name,
            'Số điện thoại / Zalo': phone,
            'Gói website quan tâm': pkg || 'Chưa chọn gói',
            'Ngành nghề kinh doanh': industry || 'Không ghi',
            'Thời gian mong muốn có web': timeline || 'Sớm nhất',
            'Ghi chú yêu cầu': note || 'Không có',
            '_subject': `🚀 [WebX] Yêu cầu báo giá mới từ ${name} (${phone})`,
            '_template': 'table',
            '_captcha': 'false'
          })
        });
      } catch (err) {
        console.log('Email delivery handled:', err);
      }

      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.textContent = origBtnText;
      }

      showToast('✅ Đã gửi yêu cầu thành công! Thông tin đã chuyển về email longlesinep114@gmail.com. Em Lê Thành Long sẽ liên hệ lại ngay.', 5000);
      form.reset();
    });
  }

  /* ---------- CHATBOT TƯ VẤN 24/7 ---------- */
  function initChatbot() {
    const fab = $('#chat-fab');
    const panel = $('#chat-panel');
    const closeBtn = $('#chat-close');
    const body = $('#chat-body');
    const input = $('#chat-input');
    const sendBtn = $('#chat-send');
    let hasGreeting = false;

    if (!fab || !panel) return;

    function addMsg(text, sender = 'bot') {
      const msg = document.createElement('div');
      msg.className = 'chat-msg ' + sender;
      msg.textContent = text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    function findAnswer(q) {
      const clean = q.toLowerCase();
      for (const item of data.chatbotKB) {
        for (const k of item.keywords) {
          if (clean.includes(k)) {
            return item.answer;
          }
        }
      }
      return "Dạ câu hỏi này em cần tư vấn kỹ theo yêu cầu riêng của quán anh/chị. Anh/chị nhắn trực tiếp Zalo 0325 477 523 hoặc để lại số điện thoại ở form báo giá bên dưới, em gọi lại liền ạ!";
    }

    function send(text) {
      if (!text) return;
      addMsg(text, 'me');
      if (input) input.value = '';
      setTimeout(() => {
        addMsg(findAnswer(text), 'bot');
      }, 350);
    }

    fab.addEventListener('click', () => {
      panel.classList.toggle('open');
      if (!hasGreeting) {
        hasGreeting = true;
        addMsg("Chào anh/chị! Em là Lê Thành Long bên WebX 👋", "bot");
        addMsg("Em chuyên làm website tinh gọn cho quán cà phê, quán ăn, spa, phòng gym — xong trong 2 ngày, trả 1 lần không phí tháng.", "bot");
        addMsg("Anh/chị cứ bấm các câu hỏi nhanh bên dưới hoặc gõ câu hỏi cho em nhé!", "bot");
      }
    });

    closeBtn?.addEventListener('click', () => panel.classList.remove('open'));

    sendBtn?.addEventListener('click', () => {
      send(input?.value.trim());
    });

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        send(input.value.trim());
      }
    });

    $$('.chat-quick button').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-q') || btn.textContent.trim();
        send(q);
      });
    });
  }

  /* ---------- TRANG DANH SÁCH SẢN PHẨM / MẪU WEB (san-pham.html) ---------- */
  function initCatalogPage() {
    const grid = $('#catalog-grid');
    const filterBtns = $$('.catalog-filter-btn');
    const searchInput = $('#catalog-search');

    function render(list) {
      if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--ink-muted);">Không tìm thấy mẫu website phù hợp. Bạn thử tìm từ khóa khác nhé!</div>';
        return;
      }
      grid.innerHTML = list.map(p => `
        <div class="demo-card">
          <div class="demo-thumb-wrap">
            <img src="${p.img}" alt="${p.name}" class="demo-thumb" loading="lazy" />
            <span class="demo-tag-badge">${p.tag}</span>
          </div>
          <div class="demo-body">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--secondary-dark); margin-bottom: 4px;">${p.badge}</div>
            <h3 class="demo-name">${p.name}</h3>
            <p class="demo-desc">${p.desc}</p>
            <div class="demo-meta">
              <span class="demo-price">${p.price}</span>
              <span class="demo-time">⚡ ${p.deliveryDays} ngày bàn giao</span>
            </div>
            <div class="demo-actions">
              <a href="${p.demoUrl}" target="_blank" class="btn btn-ghost btn-sm">Xem Demo ↗</a>
              <a href="chi-tiet-san-pham.html?id=${p.id}" class="btn btn-primary btn-sm">Chi tiết mẫu</a>
            </div>
          </div>
        </div>
      `).join('');
    }

    render(data.products);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        const query = (searchInput?.value || '').toLowerCase().trim();

        let filtered = data.products;
        if (cat && cat !== 'all') {
          filtered = filtered.filter(p => p.categorySlug === cat);
        }
        if (query) {
          filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
        }
        render(filtered);
      });
    });

    searchInput?.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const activeCat = $('.catalog-filter-btn.active')?.getAttribute('data-cat') || 'all';
      let filtered = data.products;
      if (activeCat !== 'all') {
        filtered = filtered.filter(p => p.categorySlug === activeCat);
      }
      if (query) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.tag.toLowerCase().includes(query));
      }
      render(filtered);
    });
  }

  /* ---------- TRANG CHI TIẾT SẢN PHẨM (chi-tiet-san-pham.html) ---------- */
  function initProductDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'cafe';
    const prod = data.products.find(p => p.id === id) || data.products[0];

    document.title = prod.name + ' — Mẫu Website WebX';
    $('#prod-title').textContent = prod.name;
    $('#prod-badge').textContent = prod.badge;
    $('#prod-price').textContent = prod.price;
    $('#prod-tag').textContent = prod.tag;
    $('#prod-time').textContent = prod.deliveryDays + ' ngày hoàn thành';
    $('#prod-desc').textContent = prod.fullDesc;
    $('#prod-demo-link').href = prod.demoUrl;
    $('#prod-order-link').href = 'thanh-toan.html?prod=' + prod.id;

    const mainImg = $('#prod-main-img');
    if (mainImg) mainImg.src = prod.img;

    const galleryWrap = $('#prod-gallery-thumbs');
    if (galleryWrap && prod.gallery) {
      galleryWrap.innerHTML = prod.gallery.map((img, idx) => `
        <img src="${img}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-src="${img}" alt="Preview ${idx}" />
      `).join('');

      $$('.gallery-thumb', galleryWrap).forEach(thumb => {
        thumb.addEventListener('click', () => {
          $$('.gallery-thumb', galleryWrap).forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          if (mainImg) mainImg.src = thumb.getAttribute('data-src');
        });
      });
    }

    const featWrap = $('#prod-features-list');
    if (featWrap) {
      featWrap.innerHTML = prod.features.map(f => `<li>${f}</li>`).join('');
    }

    // Sản phẩm liên quan
    const relWrap = $('#related-products-grid');
    if (relWrap) {
      const others = data.products.filter(p => p.id !== prod.id).slice(0, 2);
      relWrap.innerHTML = others.map(p => `
        <div class="demo-card">
          <div class="demo-thumb-wrap">
            <img src="${p.img}" alt="${p.name}" class="demo-thumb" />
            <span class="demo-tag-badge">${p.tag}</span>
          </div>
          <div class="demo-body">
            <h3 class="demo-name">${p.name}</h3>
            <p class="demo-desc">${p.desc}</p>
            <div class="demo-actions">
              <a href="chi-tiet-san-pham.html?id=${p.id}" class="btn btn-ghost btn-sm" style="grid-column: 1/-1">Xem mẫu này →</a>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  /* ---------- TRANG CHI TIẾT BÀI VIẾT (chi-tiet-tin-tuc.html) ---------- */
  function initArticleDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || 'kinh-nghiem-lam-web-quan-ca-phe';
    const article = data.articles.find(a => a.slug === slug) || data.articles[0];

    document.title = article.title + ' — WebX';
    $('#art-title').textContent = article.title;
    $('#art-tag').textContent = article.category;
    $('#art-date').textContent = article.date;
    $('#art-read').textContent = article.readTime;
    $('#art-author').textContent = article.author;
    $('#art-hero-img').src = article.img;
    $('#art-content-body').innerHTML = article.content;

    // Bài viết liên quan
    const relWrap = $('#related-articles-grid');
    if (relWrap) {
      const others = data.articles.filter(a => a.id !== article.id).slice(0, 2);
      relWrap.innerHTML = others.map(a => `
        <div class="article-card">
          <div class="article-thumb-wrap">
            <img src="${a.img}" alt="${a.title}" class="article-thumb" />
          </div>
          <div class="article-body">
            <span class="article-tag" style="align-self: flex-start; margin-bottom: 8px;">${a.category}</span>
            <h4 class="article-title" style="font-size: 1.05rem;">${a.title}</h4>
            <a href="chi-tiet-tin-tuc.html?slug=${a.slug}" class="article-link">Đọc tiếp →</a>
          </div>
        </div>
      `).join('');
    }
  }

  /* ---------- POPUP HIỂN THỊ MÃ QR ZALO (LÊ THÀNH LONG) ---------- */
  function initZaloQRModal() {
    if (!$('#zalo-qr-modal')) {
      const modalDiv = document.createElement('div');
      modalDiv.className = 'zalo-qr-modal-overlay';
      modalDiv.id = 'zalo-qr-modal';
      modalDiv.setAttribute('role', 'dialog');
      modalDiv.setAttribute('aria-modal', 'true');
      modalDiv.innerHTML = `
        <div class="zalo-qr-modal-content">
          <button class="zalo-qr-modal-close" id="zalo-qr-close" aria-label="Đóng">✕</button>
          <div class="zalo-qr-modal-header">
            <div class="zalo-avatar-badge">💬</div>
            <div>
              <h3>Lê Thành Long</h3>
              <p>Danh thiếp Zalo cá nhân</p>
            </div>
          </div>
          <div class="zalo-qr-img-wrapper">
            <img src="assets/zalo_qr_le_thanh_long.jpg" alt="Mã QR Zalo Lê Thành Long" class="zalo-qr-card-img" />
          </div>
          <p class="zalo-qr-instruction">
            📸 <strong>Mở Zalo trên điện thoại</strong> → Chọn biểu tượng <strong>Quét QR</strong> để kết bạn & nhắn tin trực tiếp với em!
          </p>
          <div class="zalo-qr-actions">
            <a href="https://zaloapp.com/qr/p/1m2koedeqiy8z" target="_blank" class="btn btn-primary" style="flex: 1; text-align: center;">Mở ứng dụng Zalo ↗</a>
            <button class="btn btn-ghost" id="btn-close-zalo-modal">Đóng</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalDiv);
    }

    const modal = $('#zalo-qr-modal');
    const closeBtn = $('#zalo-qr-close');
    const closeBtn2 = $('#btn-close-zalo-modal');

    window.openZaloQRModal = function () {
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    window.closeZaloQRModal = function () {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', window.closeZaloQRModal);
    closeBtn2?.addEventListener('click', window.closeZaloQRModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) window.closeZaloQRModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('open')) {
        window.closeZaloQRModal();
      }
    });

    // Bắt sự kiện click vào các nút liên hệ Zalo trên web
    document.addEventListener('click', (e) => {
      const zaloBtn = e.target.closest('a[href*="zaloapp.com/qr"], a.direct-action-btn.zalo, a.float-btn.zalo, .btn-zalo-qr');
      if (zaloBtn) {
        e.preventDefault();
        window.openZaloQRModal();
      }
    });
  }

})();
