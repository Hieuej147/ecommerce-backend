from typing import Optional
from langchain.tools import tool
from agents.tools.be_client import make_gateway_request

@tool
def query_catalog_products(
    search: Optional[str] = None,
    category_slug: Optional[str] = None,
    status: Optional[str] = None,
    low_stock_only: bool = False,
    page_size: int = 20
) -> dict:
    """Query products from the catalog microservice.
    Parameters:
      - search: keyword to search product name or description
      - category_slug: filter by category (e.g., 'outerwear', 'shoes', 'pants', 'tees', 'accessories')
      - status: filter by status (e.g., 'ACTIVE', 'ARCHIVED')
      - low_stock_only: if True, only returns items where stockQuantity <= 20
      - page_size: number of items to return (default 20)
    """
    params = {
        "pageSize": min(page_size, 50),
        "search": search,
        "status": status,
    }
    res = make_gateway_request("/products", params=params)
    if res.get("error"):
        return {"error": True, "message": "Không thể lấy danh sách sản phẩm từ Catalog.", "details": res}

    raw_products = res.get("products", [])
    formatted = []
    for p in raw_products:
        p_category = p.get("categorySlug", "")
        if category_slug and p_category.lower() != category_slug.lower():
            continue

        stock = p.get("stockQuantity", 0)
        if low_stock_only and stock > 20:
            continue

        price_obj = p.get("price", {})
        amount_minor = price_obj.get("amountMinor", {})
        # Protobuf int64 might serialize as {"low": 1490000, "high": 0} or directly as int
        if isinstance(amount_minor, dict):
            price_val = amount_minor.get("low", 0)
        else:
            price_val = amount_minor or 0

        # Extract primary image URL
        images = p.get("images", {})
        img_url = ""
        if isinstance(images, dict) and images:
            img_url = list(images.values())[0]

        formatted.append({
            "id": p.get("id"),
            "slug": p.get("slug"),
            "name": p.get("name"),
            "sku": p.get("sku"),
            "category": p_category,
            "stockQuantity": stock,
            "reorderPoint": p.get("reorderPoint", 20),
            "price": price_val,
            "currency": price_obj.get("currency", "VND"),
            "status": p.get("status"),
            "imageUrl": img_url,
        })

    return {
        "count": len(formatted),
        "products": formatted,
    }
