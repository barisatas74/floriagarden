-- Görsel konum/zoom ayarları için kolon (eski kurulumlarda eksik olabilir).
-- Uygulama bu kolonu ilk ürün kaydında otomatik ekler; bu dosya manuel
-- çalıştırma için referanstır.
ALTER TABLE products
  ADD COLUMN image_settings TEXT NULL AFTER image;
