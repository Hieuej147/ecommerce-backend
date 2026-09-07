# Stripe sandbox local test

## Cài CLI

```bash
npm install -g @stripe/cli
stripe version
stripe login
```

Nếu Fish không tìm thấy binary sau khi cài:

```fish
fish_add_path (npm bin -g)
exec fish
```

## Forward webhook

Mở terminal riêng và giữ process chạy trong lúc thanh toán:

```bash
stripe listen --forward-to http://localhost:3000/v1/payments/webhook/stripe
```

CLI in ra secret dạng `whsec_...`. Đặt secret thật vào `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=usd
```

`STRIPE_SECRET_KEY` chỉ nằm ở Payment Service, không đưa lên frontend và không
commit vào Git. Production nên dùng restricted key/secrets manager. Secret của
Stripe Dashboard webhook và secret của `stripe listen` là hai secret khác nhau.

## Kiểm tra thành công

Listener phải log event `checkout.session.completed`. Sau đó:

```text
Payment.status = PAID
Order.paymentStatus = PAID
Order.status = PAID
```

Gửi lại cùng event không được tạo cập nhật lần hai. Chữ ký giả phải bị từ chối.
