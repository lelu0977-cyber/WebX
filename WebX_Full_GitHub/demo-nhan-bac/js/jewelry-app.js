// LOGIC XỬ LÝ TOÀN BỘ WEBSITE TRANG SỨC KAT JEWELRY
(function() {
  'use strict';
  const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8000/api' : '/api';


  // Submit order to Laravel Backend
  async function submitOrderToBackend(formData) {
    try {
      const cart = getCart();
      if (!cart || cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return false;
      }

      const payload = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || '',
        city: formData.city,
        address: formData.address,
        note: formData.note,
        items: cart,
        payment_method: 'VietQR'
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.status === 'success') {
        // Clear cart
        localStorage.removeItem(CART_KEY);
        updateCartCount();

        // Update QR display
        const bank = result.data.bank;
        const qrImg = document.getElementById('vietQrImage');
        if (qrImg && bank.qrUrl) qrImg.src = bank.qrUrl;

        const memoEl = document.getElementById('qrMemoText');
        if (memoEl) memoEl.textContent = bank.memo;

        const totalEl = document.getElementById('checkoutTotal');
        if (totalEl) totalEl.textContent = formatMoney(result.data.total_amount);

        // Show success modal or alert
        alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\nMã đơn hàng của bạn: ${result.data.order_code}\nVui lòng quét mã VietQR để thanh toán nhanh.`);
        return true;
      } else {
        alert(result.message || 'Lỗi đặt hàng');
        return false;
      }
    } catch(err) {
      console.warn('API fallback to local demo:', err);
      alert('🎉 Đặt hàng thành công! (Chế độ Demo cục bộ).');
      return true;
    }
  }


  // --- QUẢN LÝ GIỎ HÀNG (CART STATE) ---
  const CART_KEY = 'kat_cart_items';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch(e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + (item.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function addToCart(productId, size, qty = 1) {
    const prod = window.KAT_JEWELRY.products.find(p => p.id === productId);
    if (!prod) return;

    let cart = getCart();
    const selectedSize = size || (prod.sizes && prod.sizes[0]) || "Freesize";
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === selectedSize);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.images[0],
        sku: prod.sku,
        size: selectedSize,
        qty: qty
      });
    }

    saveCart(cart);
    showToast(`Đã thêm "${prod.name} (${selectedSize})" vào giỏ hàng ✨`);
  }

  function showToast(msg) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>💍</span> <div>${msg}</div>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function formatMoney(num) {
    return new Intl.NumberFormat('vi-VN').format(num) + '₫';
  }

  // --- RENDER SẢN PHẨM TRANG CHỦ & DANH MỤC ---
  function renderProductCard(p) {
    const discountPercent = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
    return `
      <div class="product-card" data-category="${p.category}">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          ${discountPercent > 0 ? `<span class="product-discount-tag">-${discountPercent}%</span>` : ''}
          <a href="chi-tiet-san-pham.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
          </a>
        </div>
        <div class="product-body">
          <div class="product-cat-name">${p.engName || '925 SILVER RING'}</div>
          <a href="chi-tiet-san-pham.html?id=${p.id}" class="product-title">${p.name}</a>
          <div class="product-rating">
            ★★★★★ <span class="count">(${p.reviewCount})</span>
          </div>
          <div class="product-price-row">
            <span class="price-current">${formatMoney(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatMoney(p.oldPrice)}</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="btn-card-buy" onclick="KAT_APP.quickBuy('${p.id}')">Mua Ngay</button>
            <a href="chi-tiet-san-pham.html?id=${p.id}" class="btn-card-detail">Xem Chi Tiết</a>
          </div>
        </div>
      </div>
    `;
  }

  function initHomePage() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;

    const data = window.KAT_JEWELRY;
    grid.innerHTML = data.products.slice(0, 8).map(renderProductCard).join('');

    // Category Tabs Filter
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;

        if (cat === 'all') {
          grid.innerHTML = data.products.slice(0, 8).map(renderProductCard).join('');
        } else {
          const filtered = data.products.filter(p => p.category === cat || p.subCategory === cat);
          grid.innerHTML = (filtered.length ? filtered : data.products.slice(0, 4)).map(renderProductCard).join('');
        }
      });
    });
  }

  function initCatalogPage() {
    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    const data = window.KAT_JEWELRY;
    const urlParams = new URLSearchParams(window.location.search);
    const initialCat = urlParams.get('cat') || 'all';

    function renderList(catFilter = 'all', sort = 'newest') {
      let list = [...data.products];
      if (catFilter !== 'all') {
        list = list.filter(p => p.category === catFilter || p.subCategory === catFilter);
      }

      if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      if (sort === 'rating') list.sort((a, b) => b.reviewCount - a.reviewCount);

      grid.innerHTML = list.map(renderProductCard).join('');
      const countEl = document.getElementById('productCountLabel');
      if (countEl) countEl.textContent = `Hiển thị ${list.length} mẫu trang sức`;
    }

    renderList(initialCat);

    // Filter Buttons
    document.querySelectorAll('[data-filter-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('[data-filter-cat]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sortVal = document.getElementById('sortSelect')?.value || 'newest';
        renderList(btn.dataset.filterCat, sortVal);
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const activeBtn = document.querySelector('[data-filter-cat].active');
        const catVal = activeBtn ? activeBtn.dataset.filterCat : 'all';
        renderList(catVal, sortSelect.value);
      });
    }
  }

  // --- TRANG CHI TIẾT SẢN PHẨM ---
  function initDetailPage() {
    const container = document.getElementById('productDetailContainer');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('id') || 'midi-big-heart';
    const prod = window.KAT_JEWELRY.products.find(p => p.id === prodId) || window.KAT_JEWELRY.products[0];

    document.title = `${prod.name} | KaT Jewelry - Trang Sức Bạc 925`;

    let selectedSize = prod.sizes[0] || "Size 6";
    let selectedQty = 1;

    container.innerHTML = `
      <div class="product-detail-grid">
        <div class="gallery-col">
          <img id="mainDetailImg" class="gallery-main-img" src="${prod.images[0]}" alt="${prod.name}" />
          <div class="gallery-thumbs">
            ${prod.images.map((img, idx) => `
              <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="KAT_APP.changeDetailImage('${img}', this)">
                <img src="${img}" alt="${prod.name}" />
              </div>
            `).join('')}
          </div>
        </div>
        <div class="info-col">
          <div class="detail-sku">SKU: ${prod.sku} • ${prod.engName}</div>
          <h1 class="detail-title">${prod.name}</h1>
          <div class="product-rating" style="font-size: 15px; margin-bottom: 16px;">
            ★★★★★ <span class="count">(${prod.reviewCount} đánh giá từ khách hàng đã mua)</span>
          </div>
          
          <div class="detail-price-box">
            <span class="detail-price-current">${formatMoney(prod.price)}</span>
            ${prod.oldPrice ? `<span class="detail-price-old">${formatMoney(prod.oldPrice)}</span>` : ''}
            <span class="product-badge" style="position:static; background:#0f3d62;">Bạc Ý 925 Cao Cấp</span>
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <div class="size-selector-label">
              <span>Chọn Size Nhẫn: <strong id="currentSelectedSizeLabel" style="color:var(--primary);">${selectedSize}</strong></span>
              <span class="size-guide-link" onclick="KAT_APP.openSizeModal()">📏 Bảng đo size nhẫn</span>
            </div>
            <div class="size-chips-wrap">
              ${prod.sizes.map((sz, idx) => `
                <button type="button" class="size-chip ${idx === 0 ? 'active' : ''}" onclick="KAT_APP.selectSize('${sz}', this)">${sz}</button>
              `).join('')}
            </div>
          </div>

          <div class="qty-buy-group">
            <div class="qty-control">
              <button class="qty-btn" onclick="KAT_APP.updateQty(-1)">−</button>
              <input type="text" id="detailQtyInput" class="qty-input" value="1" readonly />
              <button class="qty-btn" onclick="KAT_APP.updateQty(1)">+</button>
            </div>
            <button class="btn-add-cart" onclick="KAT_APP.addCurrentToCart('${prod.id}')">🛒 Thêm Giỏ Hàng</button>
            <button class="btn-buy-now" onclick="KAT_APP.buyNowCurrent('${prod.id}')">⚡ Mua Ngay</button>
          </div>

          <div style="background:var(--primary-soft); border:1px solid #d0e7f5; border-radius:12px; padding:18px; margin-top:20px;">
            <div style="font-weight:700; color:var(--dark-navy); margin-bottom:8px; font-size:14px;">✨ Đặc quyền khi mua tại KaT Jewelry:</div>
            <ul style="font-size:13.5px; color:#475569; padding-left:18px; line-height:1.8;">
              <li>Bảo hành đánh bóng làm sáng <strong>TRỌN ĐỜI MIỄN PHÍ</strong>.</li>
              <li>Hỗ trợ đổi size trong vòng 7 ngày nếu không vừa ngón tay.</li>
              <li>Tặng kèm hộp đựng trang sức cao cấp và khăn lau bạc chuyên dụng.</li>
            </ul>
          </div>
        </div>
      </div>

      <div style="margin-top: 50px; background:#fff; border:1px solid var(--silver-border); border-radius:16px; padding:32px;">
        <h2 style="font-family:var(--font-serif); font-size:24px; color:var(--primary); margin-bottom:16px;">Mô tả sản phẩm & Câu chuyện thiết kế</h2>
        <p style="font-size:15px; color:#334155; line-height:1.8; margin-bottom:16px;">${prod.description}</p>
        <p style="font-size:15px; color:#334155; line-height:1.8;"><strong>Chất liệu:</strong> ${prod.material}</p>
      </div>
    `;

    // Render related products
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedGrid) {
      const related = window.KAT_JEWELRY.products.filter(p => p.id !== prod.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(renderProductCard).join('');
    }
  }

  // --- TRANG THANH TOÁN (CHECKOUT & VIETQR) ---
  function initCheckoutPage() {
    const listContainer = document.getElementById('checkoutCartList');
    if (!listContainer) return;

    const cart = getCart();
    const bank = window.KAT_JEWELRY.brand.bank;

    if (cart.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
          <div style="font-size:48px; margin-bottom:12px;">💍</div>
          <h3>Giỏ hàng của bạn đang trống</h3>
          <p style="color:var(--text-muted); margin:10px 0 20px;">Hãy chọn ngay những mẫu nhẫn bạc Midi Ring ưng ý nhé!</p>
          <a href="nhan-bac-midi-ring.html" class="btn-primary-blue" style="padding:10px 24px; border-radius:20px;">Khám Phá Sản Phẩm</a>
        </div>
      `;
      document.getElementById('checkoutSummaryBox')?.remove();
      return;
    }

    let subtotal = 0;
    listContainer.innerHTML = cart.map((item, idx) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div style="display:flex; align-items:center; gap:16px; padding:14px 0; border-bottom:1px solid #f1f5f9;">
          <img src="${item.image}" alt="${item.name}" style="width:64px; height:64px; border-radius:8px; object-fit:cover; border:1px solid #e2e8f0;" />
          <div style="flex-grow:1;">
            <div style="font-weight:700; font-size:14.5px; color:var(--dark-navy);">${item.name}</div>
            <div style="font-size:12.5px; color:var(--text-muted);">Size: <strong>${item.size}</strong> • SL: ${item.qty}</div>
            <div style="font-weight:700; color:var(--primary); font-size:14px;">${formatMoney(itemTotal)}</div>
          </div>
          <button type="button" onclick="KAT_APP.removeFromCart(${idx})" style="background:none; border:none; color:#ef4444; font-size:18px; cursor:pointer;" title="Xóa">✕</button>
        </div>
      `;
    }).join('');

    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const finalTotal = subtotal + shippingFee;

    const subtotalEl = document.getElementById('checkoutSubtotal');
    const shippingEl = document.getElementById('checkoutShipping');
    const totalEl = document.getElementById('checkoutTotal');

    if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
    if (shippingEl) shippingEl.textContent = shippingFee === 0 ? 'Miễn phí (Freeship)' : formatMoney(shippingFee);
    if (totalEl) totalEl.textContent = formatMoney(finalTotal);

    // Cập nhật mã VietQR
    const orderCode = 'KAT' + Math.floor(100000 + Math.random() * 900000);
    const memo = `${orderCode}`;
    const vietQrUrl = `https://img.vietqr.io/image/${bank.bankId}-${bank.accountNo}-compact2.png?amount=${finalTotal}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(bank.accountName)}`;

    const qrImg = document.getElementById('vietQrImage');
    if (qrImg) {
      qrImg.src = vietQrUrl;
      qrImg.onerror = () => { qrImg.src = bank.qrFallback; };
    }

    const memoEl = document.getElementById('qrMemoText');
    if (memoEl) memoEl.textContent = memo;

    const accNameEl = document.getElementById('qrAccName');
    if (accNameEl) accNameEl.textContent = bank.accountName;

    const accNoEl = document.getElementById('qrAccNo');
    if (accNoEl) accNoEl.textContent = bank.accountDisplay;
  }

  // --- POPUP HƯỚNG DẪN ĐO SIZE NHẪN ---
  function openSizeModal() {
    let modal = document.getElementById('sizeFinderModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sizeFinderModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close-btn" onclick="KAT_APP.closeSizeModal()">✕</button>
          <h2 style="font-family:var(--font-serif); font-size:24px; color:var(--primary); margin-bottom:8px;">📏 Bảng Đo Size Nhẫn Chuẩn KaT Jewelry</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Dùng thước dây quấn quanh đốt ngón tay muốn đeo (Midi Ring đeo ở đốt thứ 2).</p>
          
          <div style="background:var(--primary-subtle); padding:16px; border-radius:12px; margin-bottom:20px;">
            <label style="font-size:13.5px; font-weight:700; color:var(--dark-navy); display:block; margin-bottom:6px;">Nhập chu vi ngón tay của bạn (mm):</label>
            <div style="display:flex; gap:10px;">
              <input type="number" id="calcMmInput" placeholder="Ví dụ: 53" style="flex:1; padding:10px 14px; border:1px solid #b8daf0; border-radius:8px; font-size:15px;" />
              <button type="button" class="btn-primary-blue" onclick="KAT_APP.calcRingSize()" style="border-radius:8px; padding:10px 20px;">Tra Size Ngay</button>
            </div>
            <div id="calcResultBox" style="margin-top:10px; font-weight:700; color:var(--primary); font-size:15px;"></div>
          </div>

          <table class="size-table">
            <thead>
              <tr>
                <th>Size Nhẫn</th>
                <th>Đường kính</th>
                <th>Chu vi ngón</th>
                <th>Vị trí đeo khuyên dùng</th>
              </tr>
            </thead>
            <tbody>
              ${window.KAT_JEWELRY.sizeGuide.map(s => `
                <tr>
                  <td><strong>${s.size}</strong></td>
                  <td>${s.diameter}</td>
                  <td>${s.circumference}</td>
                  <td style="color:var(--text-muted);">${s.recommend}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add('show');
  }

  function closeSizeModal() {
    const modal = document.getElementById('sizeFinderModal');
    if (modal) modal.classList.remove('show');
  }

  function calcRingSize() {
    const mm = parseFloat(document.getElementById('calcMmInput')?.value);
    const resBox = document.getElementById('calcResultBox');
    if (!mm || mm < 38 || mm > 70) {
      if (resBox) resBox.innerHTML = `<span style="color:#ef4444;">⚠️ Vui lòng nhập số mm từ 40mm đến 65mm.</span>`;
      return;
    }

    let foundSize = "Size 6";
    if (mm <= 42) foundSize = "Size 3 (Midi Ring ngón út)";
    else if (mm <= 45) foundSize = "Size 4 (Midi Ring ngón áp út)";
    else if (mm <= 48) foundSize = "Size 5 (Midi Ring ngón giữa - Rất phổ biến)";
    else if (mm <= 51) foundSize = "Size 6 (Gốc ngón áp út / Midi ngón trỏ)";
    else if (mm <= 54) foundSize = "Size 7 (Ngón giữa / Ngón trỏ nữ)";
    else if (mm <= 58) foundSize = "Size 8 (Ngón trỏ / Ngón cái)";
    else if (mm <= 61) foundSize = "Size 9";
    else foundSize = "Size 10 hoặc Freesize";

    if (resBox) resBox.innerHTML = `🎉 Size phù hợp nhất với bạn là: <strong>${foundSize}</strong>`;
  }

  // --- EXPORT TO GLOBAL SCOPE ---
  window.KAT_APP = {
    submitOrderToBackend,
    addToCart,
    showToast,
    openSizeModal,
    closeSizeModal,
    calcRingSize,
    updateCartCount,
    quickBuy: function(id) {
      addToCart(id, "Size 6", 1);
      window.location.href = 'thanh-toan.html';
    },
    selectSize: function(sz, btn) {
      document.querySelectorAll('.size-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = document.getElementById('currentSelectedSizeLabel');
      if (label) label.textContent = sz;
    },
    changeDetailImage: function(src, thumb) {
      document.getElementById('mainDetailImg').src = src;
      document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    },
    updateQty: function(delta) {
      const input = document.getElementById('detailQtyInput');
      if (!input) return;
      let val = parseInt(input.value) + delta;
      if (val < 1) val = 1;
      if (val > 20) val = 20;
      input.value = val;
    },
    addCurrentToCart: function(id) {
      const activeSize = document.querySelector('.size-chip.active')?.textContent || "Size 6";
      const qty = parseInt(document.getElementById('detailQtyInput')?.value || 1);
      addToCart(id, activeSize, qty);
    },
    buyNowCurrent: function(id) {
      const activeSize = document.querySelector('.size-chip.active')?.textContent || "Size 6";
      const qty = parseInt(document.getElementById('detailQtyInput')?.value || 1);
      addToCart(id, activeSize, qty);
      window.location.href = 'thanh-toan.html';
    },
    removeFromCart: function(idx) {
      let cart = getCart();
      cart.splice(idx, 1);
      saveCart(cart);
      initCheckoutPage();
    }
  };

  // DOM INIT
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initHomePage();
    initCatalogPage();
    initDetailPage();
    initCheckoutPage();
  });

})();
