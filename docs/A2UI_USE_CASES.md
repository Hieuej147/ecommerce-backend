# A2UI use cases trong MVP

Các component tree tìm được từ sample flight/playlist/purchase có ích ở **mức
ý tưởng**, không copy nguyên schema vào domain e-commerce. Backend hiện dùng
A2UI v0.9 operations qua AG-UI `ACTIVITY_SNAPSHOT`.

## 1. Sales KPI card (thay flight card)

Agent hỏi doanh thu/KPI → agent chính gọi A2A analytics → trả một `Card` với
`orders`, `revenue`, `trend`. Đây là read-only surface, không thay toàn bộ
dashboard.

```text
Card
└── Column
    ├── Text("Sales KPI")
    ├── Text(path=/orders)
    ├── Text(path=/revenue)
    └── Text(path=/trend)
```

## 2. Exception/low-stock list (thay playlist)

Sau khi có inventory metrics, agent có thể trả danh sách sản phẩm dưới
reorder point. Đây là surface thứ hai, chỉ xuất hiện khi user hỏi “sản phẩm
nào cần nhập hàng?”. Mỗi item là Row gồm SKU, tên và tồn kho; trang Inventory
chính vẫn dùng React table.

## 3. Order confirmation (thay purchase complete)

Khi user yêu cầu xác nhận thao tác order, agent trả `Card` + text + action
`confirm_order`. Hiện MVP chỉ hiển thị form xác nhận; việc mutate order vẫn
phải qua REST endpoint có auth/idempotency, không cho A2UI tự gọi database.

## Wire contract

```json
{
  "type": "ACTIVITY_SNAPSHOT",
  "activityType": "A2UI",
  "content": { "messages": [
    {"version":"v0.9","createSurface":{"surfaceId":"sales-kpi","catalogId":"dashboard"}},
    {"version":"v0.9","updateComponents":{"surfaceId":"sales-kpi","components":[]}},
    {"version":"v0.9","updateDataModel":{"surfaceId":"sales-kpi","path":"/","value":{}}}
  ]}
}
```

Frontend allowlist activity type `A2UI`, parse operations theo `surfaceId`, và
không render component type ngoài catalog đã cho phép. A2UI không được dùng để
thay thế navigation, CRUD table hoặc form thanh toán thông thường.
