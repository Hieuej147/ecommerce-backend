from langchain.tools import tool
from agents.tools.be_client import make_gateway_request

@tool
def get_business_metrics() -> dict:
    """Fetch real-time comprehensive e-commerce business metrics from the backend.
    Returns:
      - revenue: total revenue amount and currency
      - orderCount: total number of orders
      - averageOrder: average order value (AOV)
      - paymentHealth: payment success rate percentage
      - inventory: total products, total stock, and low stock count
      - lowStock: list of products with stock <= 20
      - exceptions: orders requiring attention (pending payment, payment failed, cancelled)
    Use this tool whenever the user asks for sales performance, revenue, orders summary,
    or business health overview.
    """
    res = make_gateway_request("/admin/overview")
    if res.get("error"):
        return {
            "error": True,
            "message": "Không thể kết nối đến hệ thống Gateway để lấy dữ liệu tổng quan.",
            "details": res
        }

    # Format numbers for clean readability
    revenue = res.get("revenue", {})
    amount_minor = revenue.get("amountMinor", 0)
    currency = revenue.get("currency", "VND")
    order_count = res.get("orderCount", 0)
    aov = res.get("averageOrder", {}).get("amountMinor", 0)
    payment_health = res.get("paymentHealth", 100)
    low_stock = res.get("lowStock", [])
    exceptions = res.get("exceptions", [])

    return {
        "summary": {
            "totalRevenue": amount_minor,
            "currency": currency,
            "totalOrders": order_count,
            "averageOrderValue": aov,
            "paymentSuccessRate": payment_health,
        },
        "inventory": {
            "totalLowStockProducts": len(low_stock),
            "lowStockItems": [
                {
                    "id": p.get("id"),
                    "name": p.get("name"),
                    "sku": p.get("sku"),
                    "stockQuantity": p.get("stockQuantity"),
                    "reorderPoint": p.get("reorderPoint", 20),
                    "status": p.get("status"),
                }
                for p in low_stock[:8]
            ]
        },
        "exceptions": {
            "count": len(exceptions),
            "items": [
                {
                    "id": o.get("id"),
                    "customerName": o.get("customerName") or o.get("shippingAddress", {}).get("recipientName") or "Khách hàng",
                    "status": o.get("status"),
                    "paymentStatus": o.get("paymentStatus"),
                    "total": o.get("total", {}).get("amountMinor", 0),
                    "createdAt": o.get("createdAt"),
                }
                for o in exceptions[:8]
            ]
        }
    }
