USE fotocopy_business;

INSERT INTO roles (id, code, name) VALUES
  (1, 'SUPER_ADMIN', 'Super Admin'),
  (2, 'OWNER', 'Owner'),
  (3, 'MANAGER', 'Manager'),
  (4, 'KASIR', 'Kasir')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO stores (id, name, code, phone, address) VALUES
  (1, 'Bali CopyTech Denpasar', 'DPS-01', '+6281234567890', 'Denpasar, Bali'),
  (2, 'Bali CopyTech Gatot Subroto', 'DPS-02', '+6281234567891', 'Jl. Gatot Subroto, Denpasar, Bali')
ON DUPLICATE KEY UPDATE name = VALUES(name), phone = VALUES(phone), address = VALUES(address);

-- Password default semua user seed: password
-- Ganti segera setelah login pertama.
INSERT INTO users (id, role_id, store_id, name, username, email, password_hash, phone) VALUES
  (1, 1, NULL, 'Super Admin', 'superadmin', 'superadmin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', '+6281234567890'),
  (2, 2, 1, 'Owner Bali CopyTech', 'owner', 'owner@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', '+6281234567890'),
  (3, 3, 1, 'Manager Denpasar', 'manager', 'manager@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', '+6281234567890'),
  (4, 4, 1, 'Kasir Denpasar', 'kasir', 'kasir@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', '+6281234567890')
ON DUPLICATE KEY UPDATE name = VALUES(name), role_id = VALUES(role_id), store_id = VALUES(store_id);

INSERT INTO categories (id, store_id, name, slug, type, icon, description) VALUES
  (1, 1, 'Mesin Fotocopy', 'mesin-fotocopy', 'product', 'printer', 'Mesin fotocopy ready stock dan rekondisi premium.'),
  (2, 1, 'Sparepart', 'sparepart', 'product', 'settings', 'Sparepart mesin fotocopy dan printer.'),
  (3, 1, 'ATK', 'atk', 'product', 'pen-tool', 'Alat tulis kantor dan kebutuhan operasional.'),
  (4, 1, 'Alat Printing', 'alat-printing', 'product', 'layers', 'Mesin laminating, press, printer, tinta, toner.')
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

INSERT INTO products (store_id, category_id, sku, barcode, name, description, cost_price, selling_price, stock, minimum_stock, is_featured) VALUES
  (1, 1, 'FC-IR-ADV-4525', '899100000001', 'Canon iR ADV 4525', 'Mesin fotocopy kantor siap pakai untuk volume menengah.', 18500000, 24500000, 3, 1, 1),
  (1, 1, 'FC-MP-3055', '899100000002', 'Ricoh MP 3055', 'Mesin fotocopy multifungsi dengan hasil cetak stabil.', 19500000, 26000000, 2, 1, 1),
  (1, 2, 'TONER-NPG67', '899100000003', 'Toner NPG-67', 'Toner compatible untuk kebutuhan kantor dan fotocopy.', 180000, 275000, 24, 5, 0),
  (1, 3, 'ATK-HVS-A4', '899100000004', 'Kertas HVS A4 80gsm', 'Kertas HVS A4 untuk print dan fotocopy.', 45000, 62000, 50, 10, 0),
  (1, 4, 'LAM-A3-330', '899100000005', 'Mesin Laminating A3', 'Mesin laminating usaha printing ukuran A3.', 650000, 950000, 6, 2, 0)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  selling_price = VALUES(selling_price),
  stock = VALUES(stock),
  minimum_stock = VALUES(minimum_stock);

INSERT INTO services (id, store_id, title, description, icon) VALUES
  (1, 1, 'Service Mesin Fotocopy Denpasar', 'Teknisi onsite untuk maintenance, perbaikan, dan penggantian sparepart.', 'wrench'),
  (2, 1, 'Sewa Mesin Fotocopy', 'Paket sewa bulanan untuk kantor, sekolah, dan usaha printing.', 'repeat'),
  (3, 1, 'Paket Usaha Fotocopy Bali', 'Konsultasi perangkat, supplies, dan setup operasional usaha.', 'briefcase')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  icon = VALUES(icon);

INSERT INTO settings (store_id, setting_key, setting_value) VALUES
  (1, 'site_title', 'Jual Mesin Fotocopy Bali | Service Fotocopy Denpasar'),
  (1, 'whatsapp', '+6281234567890'),
  (1, 'tax_rate', '0'),
  (1, 'receipt_footer', 'Terima kasih sudah berbelanja di Bali CopyTech.')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
