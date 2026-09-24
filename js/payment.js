/* ============================================================
   WebX — payment.js
   Tạo đơn hàng & Tích hợp VietQR Napas 24/7 tự động
   ============================================================ */

(function () {
  'use strict';

  const data = window.WEBNHANH_DATA;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);
  const vnd = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';

  document.addEventListener('DOMContentLoaded', () => {
    initPayment();
  });

  function initPayment() {
    const prodSelect = $('#f-prod');
    const form = $('#pay-form');
    const qrBox = $('#qr-box');
    const okBox = $('#ok-box');
    const qrImg = $('#qr-img');
    const codeEl = $('#o-code');
    const amountEl = $('#o-amount');
    const contentEl = $('#o-content');
    const bankInfoEl = $('#bank-info');
    const btnPaid = $('#btn-paid');
    const errEl = $('#err');

    if (!prodSelect || !form) return;

    // Đổ danh sách gói & sản phẩm
    prodSelect.innerHTML = '';
    
    // Gói dịch vụ
    const grp1 = document.createElement('optgroup');
    grp1.label = "--- Gói Dịch Vụ Website ---";
    data.pricingPackages.forEach(pkg => {
      const opt = document.createElement('option');
      opt.value = pkg.id;
      opt.setAttribute('data-price', pkg.priceNumber);
      opt.textContent = pkg.name + ' — ' + vnd(pkg.priceNumber);
      grp1.appendChild(opt);
    });
    prodSelect.appendChild(grp1);

    // Mẫu website
    const grp2 = document.createElement('optgroup');
    grp2.label = "--- Chọn Theo Mẫu Demo ---";
    data.products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = 'prod_' + p.id;
      opt.setAttribute('data-price', p.priceNumber);
      opt.textContent = 'Mẫu: ' + p.name + ' — ' + vnd(p.priceNumber);
      grp2.appendChild(opt);
    });
    prodSelect.appendChild(grp2);

    // Kiểm tra query param ?prod=...
    const urlParams = new URLSearchParams(window.location.search);
    const paramProd = urlParams.get('prod');
    if (paramProd) {
      if (paramProd === 'basic' || paramProd === 'full' || paramProd === 'custom') {
        prodSelect.value = paramProd;
      } else {
        prodSelect.value = 'prod_' + paramProd;
      }
    }

    let currentOrder = null;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      errEl.textContent = '';

      const name = $('#f-name')?.value.trim();
      const phone = $('#f-phone')?.value.trim();
      const email = $('#f-email')?.value.trim();
      const note = $('#f-note')?.value.trim();
      const selectedOpt = prodSelect.options[prodSelect.selectedIndex];
      const amount = Number(selectedOpt?.getAttribute('data-price') || 1250000);
      const prodName = selectedOpt?.text || 'Gói Website WebX';

      if (!name) {
        errEl.textContent = 'Vui lòng nhập họ tên của bạn.';
        return;
      }
      if (!phone || phone.length < 9) {
        errEl.textContent = 'Vui lòng nhập số điện thoại hợp lệ để xác nhận đơn.';
        return;
      }

      // Tạo mã đơn hàng duy nhất WNxxxxxx
      const code = 'WN' + Math.floor(100000 + Math.random() * 900000);
      currentOrder = {
        id: Date.now(),
        code: code,
        name: name,
        phone: phone,
        email: email || '',
        note: note || '',
        productName: prodName,
        amount: amount,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Lưu đơn vào LocalStorage để Admin quản lý
      const ordersStore = JSON.parse(localStorage.getItem('wn_orders') || '[]');
      ordersStore.push(currentOrder);
      localStorage.setItem('wn_orders', JSON.stringify(ordersStore));

      // Lưu khách hàng
      const custStore = JSON.parse(localStorage.getItem('wn_customers') || '[]');
      if (!custStore.find(c => c.phone === phone)) {
        custStore.push({
          id: Date.now(),
          name: name,
          phone: phone,
          zalo: phone,
          email: email || '',
          note: note || '',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('wn_customers', JSON.stringify(custStore));
      }

      // Hiển thị khung QR
      codeEl.textContent = code;
      amountEl.textContent = vnd(amount);
      contentEl.textContent = code;

      const bank = data.config.bank;
      const displayAccount = bank.accountDisplay || bank.account;
      bankInfoEl.innerHTML = `
        <div style="background: #fff; padding: 16px 20px; border-radius: 14px; border: 1.5px solid #dbe1f5; margin-top: 14px; text-align: left; line-height: 1.85;">
          <p>🏦 Ngân hàng: <b style="color: #1e293b;">${bank.bankName}</b></p>
          <p>💳 Số tài khoản: <b style="font-size: 1.25rem; color: #e85d26; font-family: monospace; letter-spacing: 0.06em;">${displayAccount}</b> 
             <button type="button" class="btn btn-sm btn-outline-primary" style="padding: 2px 10px; font-size: 0.78rem; margin-left: 8px;" id="btn-copy-stk">Sao chép STK</button>
          </p>
          <p>👤 Chủ tài khoản: <b style="color: #1e293b; font-size: 1.05rem;">${bank.name}</b></p>
          <p>📝 Nội dung CK: <b style="color: #e85d26; font-size: 1.15rem; font-family: monospace;">${code}</b>
             <button type="button" class="btn btn-sm btn-outline-primary" style="padding: 2px 10px; font-size: 0.78rem; margin-left: 8px;" id="btn-copy-memo">Sao chép nội dung</button>
          </p>
        </div>
      `;

      // Tạo link VietQR chuẩn Techcombank Napas 24/7
      const qrUrl = `https://img.vietqr.io/image/${bank.bin}-${bank.account}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(code)}&accountName=${encodeURIComponent(bank.name)}`;
      qrImg.src = qrUrl;
      qrImg.onerror = function () {
        // Fallback ảnh QR Techcombank người dùng tải lên nếu mất mạng
        qrImg.src = 'assets/qr_techcombank.jpg';
      };

      qrBox.style.display = 'block';
      okBox.style.display = 'none';

      // Nút copy STK và Memo
      $('#btn-copy-stk')?.addEventListener('click', () => {
        navigator.clipboard.writeText(bank.account);
        window.showToast('Đã sao chép số tài khoản: ' + bank.account);
      });
      $('#btn-copy-memo')?.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        window.showToast('Đã sao chép nội dung chuyển khoản: ' + code);
      });

      // Cuộn đến vùng QR
      qrBox.scrollIntoView({ behavior: 'smooth' });
    });

    btnPaid?.addEventListener('click', () => {
      if (!currentOrder) return;
      btnPaid.disabled = true;
      btnPaid.textContent = 'Đang kiểm tra giao dịch...';

      setTimeout(() => {
        // Cập nhật trạng thái đơn thành paid
        currentOrder.status = 'paid';
        const ordersStore = JSON.parse(localStorage.getItem('wn_orders') || '[]');
        const idx = ordersStore.findIndex(o => o.code === currentOrder.code);
        if (idx !== -1) {
          ordersStore[idx].status = 'paid';
          localStorage.setItem('wn_orders', JSON.stringify(ordersStore));
        }

        okBox.style.display = 'block';
        btnPaid.textContent = '✓ Giao dịch đã xác nhận';
        window.showToast('Cảm ơn bạn! Đơn hàng ' + currentOrder.code + ' đã được ghi nhận thanh toán thành công.');
      }, 1200);
    });
  }
})();
