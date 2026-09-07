# Multi-stage Dockerfile for agent-python (FastAPI + LangGraph)
FROM python:3.12-slim AS runner

WORKDIR /app

# Install system curl and uv for ultra-fast dependency management
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy dependency specifications
COPY pyproject.toml uv.lock ./

# Install python dependencies with uv
RUN uv sync --frozen --no-cache

# Copy application source code
COPY . .

ENV PATH="/app/.venv/bin:$PATH"
ENV AGENT_PORT=8123
ENV HOST=0.0.0.0

EXPOSE 8123

CMD ["python", "main.py"]
