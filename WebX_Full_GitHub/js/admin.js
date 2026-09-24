/* ============================================================
   WebX — admin.js
   Bảng điều khiển quản trị: Sản phẩm, Khách hàng, Đơn hàng
   ============================================================ */

(function () {
  'use strict';
  // Kiểm tra quyền Admin
  if (localStorage.getItem('webx_is_admin') !== 'true') {
    var pin = prompt('🔐 Trang quản trị bảo mật! Vui lòng nhập mã PIN Quản trị:');
    if (pin === '1104' || pin === 'long114' || pin === 'admin123') {
      localStorage.setItem('webx_is_admin', 'true');
    } else {
      alert('❌ Bạn không có quyền truy cập trang này!');
      window.location.href = 'index.html';
    }
  }

  const data = window.WEBNHANH_DATA;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const vnd = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';

  let products = [...data.products];
  let customers = JSON.parse(localStorage.getItem('wn_customers') || '[]');
  let orders = JSON.parse(localStorage.getItem('wn_orders') || '[]');

  // Tự động dọn dẹp nếu còn chứa dữ liệu mẫu cũ (đưa về 0 như mới)
  if (customers.some(c => c.email === 'tuan.cafe@gmail.com' || c.email === 'ha.jewelry@gmail.com' || c.name === 'Nguyễn Văn Tuấn')) {
    customers = [];
    localStorage.setItem('wn_customers', JSON.stringify([]));
  }
  if (orders.some(o => o.code === 'WN882910' || o.code === 'KAT882910' || o.name === 'Nguyễn Văn Tuấn')) {
    orders = [];
    localStorage.setItem('wn_orders', JSON.stringify([]));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAdminTabs();
    renderStats();
    renderProducts();
    renderCustomers();
    renderOrders();
    initExportImport();
    initAddProductModal();
  });

  function initAdminTabs() {
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        $$('.admin-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        $('#panel-' + tab)?.classList.add('active');
      });
    });
  }

  function renderStats() {
    const totalRev = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + (o.amount || 0), 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    
    if ($('#stat-revenue')) $('#stat-revenue').textContent = vnd(totalRev);
    if ($('#stat-orders')) $('#stat-orders').textContent = orders.length;
    if ($('#stat-pending')) $('#stat-pending').textContent = pendingCount;
    if ($('#stat-customers')) $('#stat-customers').textContent = customers.length;
  }

  /* ---------- QUẢN LÝ SẢN PHẨM ---------- */
  function renderProducts() {
    const tb = $('#tb-products');
    if (!tb) return;

    if (products.length === 0) {
      tb.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--ink-muted); padding: 30px 10px;">Chưa có mẫu website nào trong danh mục.</td></tr>';
      return;
    }

    tb.innerHTML = products.map((p, idx) => `
      <tr>
        <td><b>${p.name}</b><br><small style="color: var(--ink-muted)">${p.code}</small></td>
        <td><span class="badge-pill cyan">${p.tag}</span></td>
        <td><b style="color: var(--primary);">${vnd(p.priceNumber)}</b></td>
        <td>${p.deliveryDays} ngày</td>
        <td>${p.desc.slice(0, 55)}...</td>
        <td style="white-space: nowrap;">
          <a href="${p.demoUrl}" target="_blank" class="btn btn-sm btn-ghost">Xem</a>
          <button class="btn btn-sm btn-outline-primary" onclick="window.delProduct(${idx})">Xoá</button>
        </td>
      </tr>
    `).join('');
  }

  window.delProduct = function (idx) {
    if (confirm('Bạn có chắc muốn xoá mẫu website này khỏi danh sách?')) {
      products.splice(idx, 1);
      renderProducts();
      window.showToast('Đã xoá sản phẩm.');
    }
  };

  /* ---------- QUẢN LÝ KHÁCH HÀNG ---------- */
  function renderCustomers() {
    const tb = $('#tb-customers');
    if (!tb) return;

    if (customers.length === 0) {
      tb.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--ink-muted); padding: 36px 10px; font-size: 0.95rem;">📭 Chưa có khách hàng nào để lại thông tin (Dữ liệu mới 100%).</td></tr>';
      return;
    }

    tb.innerHTML = customers.map((c, idx) => `
      <tr>
        <td><b>${c.name}</b></td>
        <td><a href="tel:${c.phone}" style="color: var(--primary); font-weight: 700;">${c.phone}</a></td>
        <td>${c.email || '—'}</td>
        <td><span class="badge-pill">${c.package || 'Tư vấn'}</span></td>
        <td>${c.industry || '—'}</td>
        <td><small>${c.note || '—'}</small></td>
        <td><small>${(c.created_at || '').slice(0, 10)}</small></td>
        <td>
          <a href="https://zalo.me/${c.phone}" target="_blank" class="btn btn-sm btn-primary" style="padding: 4px 10px; font-size: 0.8rem;">Zalo</a>
          <button class="btn btn-sm btn-ghost" onclick="window.delCustomer(${idx})">✕</button>
        </td>
      </tr>
    `).join('');
  }

  window.delCustomer = function (idx) {
    if (confirm('Xoá thông tin khách hàng này?')) {
      customers.splice(idx, 1);
      localStorage.setItem('wn_customers', JSON.stringify(customers));
      renderCustomers();
      renderStats();
      window.showToast('Đã xoá khách hàng.');
    }
  };

  /* ---------- QUẢN LÝ ĐƠN HÀNG ---------- */
  function renderOrders() {
    const tb = $('#tb-orders');
    if (!tb) return;

    if (orders.length === 0) {
      tb.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--ink-muted); padding: 36px 10px; font-size: 0.95rem;">🛒 Chưa có đơn hàng nào trong hệ thống (Hệ thống mới tinh 100%).</td></tr>';
      return;
    }

    tb.innerHTML = orders.map((o, idx) => `
      <tr>
        <td><b style="font-family: monospace; font-size: 1.05rem; color: var(--primary);">${o.code}</b></td>
        <td><b>${o.name}</b><br><small>${o.phone}</small></td>
        <td>${o.productName}</td>
        <td><b style="color: var(--ink);">${vnd(o.amount)}</b></td>
        <td>
          ${o.status === 'paid' 
            ? '<span class="badge-pill cyan" style="background: #dcfce7; color: #166534; border-color: #86efac;">✓ Đã thanh toán</span>' 
            : '<span class="badge-pill" style="background: #fef3c7; color: #92400e; border-color: #fde68a;">⏳ Chờ thanh toán</span>'}
        </td>
        <td><small>${(o.created_at || '').replace('T', ' ').slice(0, 16)}</small></td>
        <td style="white-space: nowrap;">
          ${o.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="window.approveOrder(${idx})">Duyệt</button>` : ''}
          <button class="btn btn-sm btn-ghost" onclick="window.delOrder(${idx})">Xoá</button>
        </td>
      </tr>
    `).join('');
  }

  window.approveOrder = function (idx) {
    orders[idx].status = 'paid';
    localStorage.setItem('wn_orders', JSON.stringify(orders));
    renderOrders();
    renderStats();
    window.showToast('Đã duyệt đơn hàng ' + orders[idx].code + ' thành ĐÃ THANH TOÁN!');
  };

  window.delOrder = function (idx) {
    if (confirm('Xoá đơn hàng này?')) {
      orders.splice(idx, 1);
      localStorage.setItem('wn_orders', JSON.stringify(orders));
      renderOrders();
      renderStats();
      window.showToast('Đã xoá đơn hàng.');
    }
  };

  /* ---------- XUẤT / NHẬP JSON & ĐẶT LẠI DỮ LIỆU ---------- */
  function initExportImport() {
    $('#btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ thông tin khách hàng và đơn hàng (về 0 như mới, chưa có ai mua)?')) {
        localStorage.removeItem('wn_customers');
        localStorage.removeItem('wn_orders');
        localStorage.setItem('wn_customers', JSON.stringify([]));
        localStorage.setItem('wn_orders', JSON.stringify([]));
        products = [...data.products];
        customers = [];
        orders = [];
        renderStats();
        renderProducts();
        renderCustomers();
        renderOrders();
        window.showToast('✅ Đã xóa sạch toàn bộ đơn hàng và khách hàng (Về 0 như mới)!');
      }
    });

    $('#btn-export-json')?.addEventListener('click', () => {
      const backup = {
        exportedAt: new Date().toISOString(),
        products,
        customers,
        orders
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'webnhanh_backup_' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      window.showToast('Đã tải xuống file sao lưu JSON!');
    });
  }

  /* ---------- MODAL THÊM SẢN PHẨM MỚI ---------- */
  function initAddProductModal() {
    const modal = $('#modal-add-product');
    const btnOpen = $('#btn-open-add-product');
    const btnCancel = $('#btn-modal-cancel');
    const form = $('#form-new-product');

    btnOpen?.addEventListener('click', () => modal?.classList.add('open'));
    btnCancel?.addEventListener('click', () => modal?.classList.remove('open'));

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#np-name').value.trim();
      const tag = $('#np-tag').value.trim();
      const price = Number($('#np-price').value || 1250000);
      const days = Number($('#np-days').value || 2);
      const img = $('#np-img').value.trim() || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=75';
      const desc = $('#np-desc').value.trim();

      if (!name) {
        alert('Vui lòng nhập tên sản phẩm / mẫu web.');
        return;
      }

      const newP = {
        id: 'p_' + Date.now(),
        code: 'PROD-' + Math.floor(100 + Math.random() * 900),
        name: name,
        category: tag,
        categorySlug: 'custom',
        priceNumber: price,
        price: vnd(price),
        tag: tag || 'Mẫu mới',
        badge: 'Mới cập nhật',
        desc: desc || 'Mẫu website hiện đại theo yêu cầu.',
        fullDesc: desc || 'Mẫu website hiện đại theo yêu cầu.',
        img: img,
        demoUrl: 'demo-cafe/',
        features: ['Chuẩn di động 100%', 'Tối ưu SEO Google', 'Tích hợp nút Zalo 1 chạm'],
        deliveryDays: days,
        viewsCount: 10
      };

      products.unshift(newP);
      renderProducts();
      modal?.classList.remove('open');
      form.reset();
      window.showToast('Đã thêm mẫu website mới thành công!');
    });
  }

})();

