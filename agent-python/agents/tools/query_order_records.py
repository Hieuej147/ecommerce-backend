from typing import Optional
from langchain.tools import tool
from agents.tools.be_client import make_gateway_request

@tool
def query_order_records(
    status: Optional[str] = None,
    search: Optional[str] = None,
    page_size: int = 20
) -> dict:
    """Query order records from the order microservice.
    Parameters:
      - status: filter by order status, e.g.:
          'PAID': Orders successfully paid
          'PENDING_PAYMENT': Orders waiting for payment
          'PAYMENT_FAILED': Orders with payment failure
          'CANCELLED': Cancelled orders
      - search: keyword to match recipient name or order ID
      - page_size: number of orders to return (default 20)
    """
    params = {
        "pageSize": min(page_size, 50),
        "status": status,
        "search": search,
    }
    res = make_gateway_request("/orders/admin", params=params)
    if res.get("error"):
        return {"error": True, "message": "Không thể lấy danh sách đơn hàng từ Orders service.", "details": res}

    orders = res.get("orders", [])
    formatted = []
    for o in orders:
        total_obj = o.get("total", {})
        amount_minor = total_obj.get("amountMinor", {})
        if isinstance(amount_minor, dict):
            total_val = amount_minor.get("low", 0)
        else:
            total_val = amount_minor or 0

        shipping = o.get("shippingAddress", {})
        customer_name = o.get("customerName") or shipping.get("recipientName") or "Khách hàng"
        city = shipping.get("city", "")

        items_summary = []
        for it in o.get("items", []):
            items_summary.append({
                "productId": it.get("productId"),
                "productName": it.get("productName"),
                "quantity": it.get("quantity"),
            })

        formatted.append({
            "id": o.get("id"),
            "customerName": customer_name,
            "city": city,
            "total": total_val,
            "currency": total_obj.get("currency", "VND"),
            "status": o.get("status"),
            "paymentStatus": o.get("paymentStatus"),
            "itemCount": len(items_summary),
            "items": items_summary,
            "createdAt": o.get("createdAt"),
        })

    return {
        "count": len(formatted),
        "orders": formatted,
    }
