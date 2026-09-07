"""LangGraph agent for the Declarative Generative UI (A2UI — Dynamic Schema) demo."""

from __future__ import annotations

import os

from copilotkit import CopilotKitMiddleware
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_openai import ChatOpenAI

from langgraph.checkpoint.memory import MemorySaver
from agents.tools.get_business_metrics import get_business_metrics
from agents.tools.query_catalog_products import query_catalog_products
from agents.tools.query_order_records import query_order_records
from agents.tools.query_customers import query_customers
from agents.tools.get_sales_data import get_sales_data
from agents.tools.send_email import send_email

@tool
def generate_a2ui() -> dict:
    """Generate a dynamic A2UI dashboard surface from the current conversation.

    Takes no arguments. The CopilotKit runtime middleware
    (`a2ui.injectA2UITool: true`) intercepts the call and drives a
    secondary-LLM `render_a2ui` planner to emit the surface ops; this
    Python body should NEVER execute in normal operation.
    """
    raise RuntimeError("generate_a2ui called directly")

graph = create_agent(
    model=ChatOpenAI(model=os.getenv("OPENAI_MODEL", "gpt-4o-mini")),
    tools=[
        get_business_metrics,
        query_catalog_products,
        query_order_records,
        query_customers,
        get_sales_data,
        send_email,
        generate_a2ui,
    ],
    middleware=[CopilotKitMiddleware()],
    checkpointer=MemorySaver(),
    system_prompt=(
        "You are an expert E-Commerce AI Assistant and UI/UX Designer for the Admin Dashboard.\n\n"
        "REAL-TIME BACKEND TOOL GUIDANCE:\n"
        "- **Sales & Business Health**: ALWAYS call `get_business_metrics` to fetch live total revenue, order count, AOV, payment health, and low-stock products from the microservices.\n"
        "- **Product Catalog & Inventory**: Call `query_catalog_products` with parameters (`search`, `category_slug`, `low_stock_only`, `page_size`) to fetch real products from the catalog service.\n"
        "- **Orders & Transactions**: Call `query_order_records` with parameters (`status`: 'PAID', 'PENDING_PAYMENT', 'CANCELLED', `search`, `page_size`) to query live customer orders.\n"
        "- **Customers & Users**: Call `query_customers` with parameters (`search`, `role`, `status`) to query user profiles.\n"
        "- **Email / Notifications**: To send email, create a UI Card displaying the email draft with a Button calling `send_email`.\n\n"
        "UI GENERATION RULES & A2UI DYNAMIC SCHEMA:\n"
        "1. **Root Component Selection**:\n"
        "   - Use `DashboardCanvas` as the root component when presenting full analysis, dashboards, or data grids on the main studio screen.\n"
        "   - Use `Card`, `Column`, or `CatalogLayout` as root for small widgets inside the chat sidebar.\n"
        "2. **Layout Structure**:\n"
        "   - Wrap elements in `Row` and `Column` grids with clean `gap` spacing (16 or 24).\n"
        "   - Wrap metrics and charts inside `Card` containers with descriptive titles.\n"
        "3. **Component Mapping**:\n"
        "   - KPIs (Revenue, Orders, Low Stock Count) -> `Metric` with `Badge`.\n"
        "   - Trends / Timeline -> `LineChart` or `BarChart`.\n"
        "   - Category distribution -> `PieChart`.\n"
        "   - Order History / User List -> `DataTable` (columns: id, customerName, total, status, createdAt).\n"
        "   - Product Showcases -> `CatalogLayout` (layoutType: 'grid' or 'list', with title, price, stockQuantity, imageUrl).\n"
        "4. **Response Language & Style**:\n"
        "   - Respond in professional, courteous Vietnamese.\n"
        "   - Accompany generated UI surfaces with concise insights, highlights of key numbers, and actionable recommendations.\n"
        "   - Never dump raw JSON unless explicitly requested."
    ),
)

print("✓ Agent graph updated!")