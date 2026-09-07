from langchain.tools import tool

@tool
def get_sales_data() -> dict:
    """Fetch the latest e-commerce metrics including revenue, orders, active users, and top products.
    Use this data to feed into the dashboard UI generation.
    """
    return {
        "summary": {
            "totalRevenue": 125430.50,
            "totalOrders": 3240,
            "activeUsers": 12450,
            "conversionRate": 3.2
        },
        "trends": {
            "revenueTrend": "+12.5%",
            "ordersTrend": "+5.2%",
            "usersTrend": "+18.1%"
        },
        "revenueByMonth": [
            {"month": "Jan", "revenue": 10500},
            {"month": "Feb", "revenue": 12000},
            {"month": "Mar", "revenue": 15000},
            {"month": "Apr", "revenue": 13500},
            {"month": "May", "revenue": 18000},
            {"month": "Jun", "revenue": 21000},
        ],
        "salesByCategory": [
            {"category": "Electronics", "sales": 45000},
            {"category": "Clothing", "sales": 32000},
            {"category": "Home & Garden", "sales": 28000},
            {"category": "Sports", "sales": 20430},
        ],
        "topProducts": [
            {"id": "P001", "name": "Wireless Noise-Canceling Headphones", "sales": 1240, "revenue": 371876, "status": "In Stock", "imageUrl": "/products/1g.png"},
            {"id": "P002", "name": "Smart Watch Series 7", "sales": 985, "revenue": 393901, "status": "Low Stock", "imageUrl": "/products/2g.png"},
            {"id": "P003", "name": "Ergonomic Office Chair", "sales": 650, "revenue": 162500, "status": "In Stock", "imageUrl": "/products/3b.png"},
            {"id": "P004", "name": "Mechanical Keyboard", "sales": 420, "revenue": 63000, "status": "Out of Stock", "imageUrl": "/products/4p.png"},
            {"id": "P005", "name": "4K Ultra HD Monitor", "sales": 310, "revenue": 108500, "status": "In Stock", "imageUrl": "/products/8b.png"},
        ]
    }
