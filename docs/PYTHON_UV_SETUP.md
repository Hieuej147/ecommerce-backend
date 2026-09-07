# Python agent — uv setup

Project Python nằm riêng tại:

```text
agent-python/
├── pyproject.toml
├── uv.lock
├── .python-version
├── .venv/
└── main.py
```

Project đã pin Python 3.12 và đã có bộ dependency runtime cho LangGraph +
AG-UI + FastAPI. `uv.lock` giữ phiên bản cài đặt cụ thể.

Dependencies trực tiếp:

```text
copilotkit       0.1.94
ag-ui-langgraph  0.0.42
google-adk       1.37.0
ag-ui-adk        0.7.0
langgraph        1.2.10
langchain-openai 1.4.1
fastapi          0.141.1
uvicorn          0.52.1
python-dotenv    1.2.2
```

`langgraph-prebuilt` được `langgraph` resolver tự cài ở phiên bản tương thích.
`ag-ui-langgraph` phục vụ agent chính dùng LangGraph; `google-adk` và `ag-ui-adk`
được cài thêm cho luồng thử nghiệm ADK riêng, không thay thế agent chính.
`jupyter` và `honcho` chưa thêm vì chỉ phục vụ học tập hoặc process manager.

## Commands

```bash
# Khi đang đứng ở root repository
UV_CACHE_DIR=/tmp/microservice-ecommerce-uv-cache \
  uv sync --project agent-python --python 3.12

# Hoặc cd agent-python rồi chạy trực tiếp
cd agent-python
uv sync

# Chạy agent hiện tại
uv run python main.py

# Chạy FastAPI sau khi có app.py
uv run uvicorn app:app --reload --port 8001
```

`.venv/` và Python cache đã được bỏ qua trong root `.gitignore`.
