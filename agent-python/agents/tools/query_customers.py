from typing import Optional
from langchain.tools import tool
from agents.tools.be_client import make_gateway_request

@tool
def query_customers(
    search: Optional[str] = None,
    role: Optional[str] = None,
    status: Optional[str] = None,
    page_size: int = 20
) -> dict:
    """Query registered users and customer records from the users microservice.
    Parameters:
      - search: keyword matching user's name or email
      - role: filter by role ('customer' or 'admin')
      - status: filter by status ('active', 'suspended')
      - page_size: number of users to retrieve (default 20)
    """
    params = {
        "pageSize": min(page_size, 50),
        "search": search,
        "role": role,
        "status": status,
    }
    res = make_gateway_request("/admin/users", params=params)
    if res.get("error"):
        return {"error": True, "message": "Không thể lấy danh sách người dùng từ Users service.", "details": res}

    users = res.get("users", [])
    formatted = [
        {
            "id": u.get("id"),
            "clerkId": u.get("clerkId"),
            "displayName": u.get("displayName") or f"{u.get('firstName', '')} {u.get('lastName', '')}".strip() or "Khách hàng",
            "email": u.get("email"),
            "role": u.get("role", "customer"),
            "status": u.get("status", "active"),
            "imageUrl": u.get("imageUrl", ""),
            "createdAt": u.get("createdAt"),
        }
        for u in users
    ]

    return {
        "count": len(formatted),
        "customers": formatted,
    }
