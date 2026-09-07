import os
import urllib.request
import urllib.error
import urllib.parse
import json
from typing import Any, Optional, Dict

raw_gateway = os.getenv("GATEWAY_URL", "http://127.0.0.1:3000/v1").rstrip("/")
if not raw_gateway.endswith("/v1"):
    GATEWAY_URL = f"{raw_gateway}/v1"
else:
    GATEWAY_URL = raw_gateway

INTERNAL_TOKEN = os.getenv(
    "AGENT_INTERNAL_TOKEN",
    "microservice-ecommerce-agent-secret-token-32chars"
)

def make_gateway_request(
    path: str,
    method: str = "GET",
    params: Optional[Dict[str, Any]] = None,
    body: Optional[Dict[str, Any]] = None,
    timeout: float = 10.0
) -> Dict[str, Any]:
    """Execute an authenticated request to the Microservice API Gateway.
    Automatically injects internal service token and admin role headers.
    """
    clean_path = path.lstrip("/")
    if clean_path.startswith("v1/"):
        clean_path = clean_path[3:]
    url = f"{GATEWAY_URL}/{clean_path}"

    if params:
        query_string = urllib.parse.urlencode({
            k: v for k, v in params.items() if v is not None and v != ""
        })
        if query_string:
            url = f"{url}?{query_string}"

    headers = {
        "Accept": "application/json",
        "x-internal-service-token": INTERNAL_TOKEN,
        "x-user-role": "admin",
        "x-user-id": "agent-dashboard-runner",
    }

    data = None
    if body is not None and method in ("POST", "PUT", "PATCH"):
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            content_type = resp.headers.get("Content-Type", "")
            raw = resp.read().decode("utf-8")
            if "application/json" in content_type:
                return json.loads(raw)
            return {"raw": raw}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            parsed_err = json.loads(err_body)
            return {"error": True, "statusCode": e.code, "details": parsed_err}
        except Exception:
            return {"error": True, "statusCode": e.code, "message": err_body}
    except Exception as e:
        return {"error": True, "message": str(e)}
