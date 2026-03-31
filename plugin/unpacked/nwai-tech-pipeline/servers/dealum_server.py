#!/usr/bin/env python3
"""
NWAi Dealum MCP Server
Wraps the Dealum Integration API for NWAi TechGroup deal pipeline.

Required environment variables:
  DEALUM_TOKEN   — Your Dealum API integration token (X-Access-Token)
  DEALUM_ROOM_ID — Your Dealum deal room ID

Base URL: https://app.dealum.com/api/integrations/
"""

import json
import os
import sys
import urllib.request
import urllib.error
from typing import Any

# ── MCP SDK ─────────────────────────────────────────────────────────────────
try:
    from mcp.server.fastmcp import FastMCP
except ImportError:
    print(
        json.dumps({
            "error": "mcp package not found. Install with: pip install mcp --break-system-packages"
        }),
        file=sys.stderr,
    )
    sys.exit(1)

# ── Config ───────────────────────────────────────────────────────────────────
DEALUM_BASE = "https://app.dealum.com/api/integrations"
TOKEN = os.environ.get("DEALUM_TOKEN", "")
ROOM_ID = os.environ.get("DEALUM_ROOM_ID", "")

mcp = FastMCP("nwai-dealum")


def _headers() -> dict:
    if not TOKEN:
        raise ValueError(
            "DEALUM_TOKEN environment variable is not set. "
            "Add it to your environment and restart."
        )
    return {
        "X-Access-Token": TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


def _room_id() -> str:
    if not ROOM_ID:
        raise ValueError(
            "DEALUM_ROOM_ID environment variable is not set. "
            "Add it to your environment and restart."
        )
    return ROOM_ID


def _request(method: str, path: str, body: dict | None = None) -> Any:
    """Make an authenticated request to the Dealum API."""
    url = f"{DEALUM_BASE}/{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, headers=_headers(), method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode()
        raise RuntimeError(f"Dealum API {method} {path} → HTTP {e.code}: {body_text}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Dealum API connection error: {e.reason}") from e


# ── Tools ────────────────────────────────────────────────────────────────────

@mcp.tool()
def list_applications(tag_filter: str = "") -> str:
    """
    Retrieve all applications from the NWAi Dealum deal room.

    Args:
        tag_filter: Optional tag to filter by (e.g., "Tech"). Case-insensitive.
                    Leave empty to return all applications.

    Returns:
        JSON array of application objects with id, name, step, tags, and contact info.
    """
    apps = _request("GET", f"dealrooms/{_room_id()}/applications")
    if tag_filter:
        tag_lower = tag_filter.lower()
        apps = [
            a for a in apps
            if any(tag_lower in t.lower() for t in (a.get("tags") or []))
        ]
    # Return a clean summary to avoid overwhelming context
    summary = []
    for a in apps:
        summary.append({
            "id": a.get("id"),
            "name": a.get("name"),
            "step": a.get("step"),
            "tags": a.get("tags", []),
            "contact_email": (a.get("contact") or {}).get("email"),
            "contact_name": f"{(a.get('contact') or {}).get('firstName', '')} {(a.get('contact') or {}).get('lastName', '')}".strip(),
            "code": a.get("code"),
        })
    return json.dumps(summary, indent=2)


@mcp.tool()
def get_application(application_id: int) -> str:
    """
    Retrieve full details for a specific application by its Dealum ID.

    Args:
        application_id: The unique numeric Dealum application ID.

    Returns:
        Full application object as JSON.
    """
    app = _request("GET", f"dealrooms/{_room_id()}/applications/{application_id}")
    return json.dumps(app, indent=2)


@mcp.tool()
def update_application(
    application_id: int,
    step: str = "",
    tags_add: list[str] | None = None,
    tags_remove: list[str] | None = None,
) -> str:
    """
    Update a Dealum application: move to a new pipeline step and/or add/remove tags.

    Args:
        application_id: The unique numeric Dealum application ID.
        step:           New pipeline step name (e.g., "Screening", "Scout/IntroCall",
                        "Diligence", "Decision"). Leave empty to not change step.
        tags_add:       List of tag strings to add to the application.
        tags_remove:    List of tag strings to remove from the application.

    Returns:
        Updated application object as JSON.
    """
    body: dict[str, Any] = {}
    if step:
        body["step"] = step
    if tags_add or tags_remove:
        body["tags"] = {
            "create": tags_add or [],
            "delete": tags_remove or [],
        }
    if not body:
        return json.dumps({"message": "No changes specified — nothing updated."})
    result = _request("PATCH", f"dealrooms/{_room_id()}/applications/{application_id}", body)
    return json.dumps(result, indent=2)


@mcp.tool()
def list_members(group_filter: str = "") -> str:
    """
    Retrieve deal room members. Optionally filter by group name.

    Args:
        group_filter: Optional group name to filter by (e.g., "TechGroup", "Admin").
                      Case-insensitive. Leave empty to return all members.

    Returns:
        JSON array of member objects with id, name, email, group, and tags.
    """
    members = _request("GET", f"dealrooms/{_room_id()}/members")
    if group_filter:
        grp_lower = group_filter.lower()
        members = [m for m in members if grp_lower in (m.get("group") or "").lower()]
    summary = []
    for m in members:
        if m.get("pending"):
            continue  # skip pending members
        summary.append({
            "id": m.get("id"),
            "name": f"{m.get('firstName', '')} {m.get('lastName', '')}".strip(),
            "email": m.get("email"),
            "group": m.get("group"),
            "tags": m.get("tags", []),
        })
    return json.dumps(summary, indent=2)


@mcp.tool()
def create_application(
    company_name: str,
    contact_first_name: str,
    contact_email: str,
    step: str = "Inbox",
    contact_last_name: str = "",
    tags: list[str] | None = None,
    send_invite: bool = False,
) -> str:
    """
    Create a new company application in the Dealum deal room.

    Args:
        company_name:        Name of the company.
        contact_first_name:  First name of the primary contact.
        contact_email:       Email address of the primary contact.
        step:                Pipeline step to place the application in (default: "Inbox").
        contact_last_name:   Last name of the primary contact.
        tags:                List of tags to apply (e.g., ["Tech"]).
        send_invite:         Whether to send an automatic invitation email to the company.

    Returns:
        Created application object as JSON.
    """
    body: dict[str, Any] = {
        "name": company_name,
        "contact": {
            "firstName": contact_first_name,
            "lastName": contact_last_name,
            "email": contact_email,
        },
        "step": step,
        "invite": send_invite,
    }
    if tags:
        body["tags"] = tags
    result = _request("POST", f"dealrooms/{_room_id()}/applications", body)
    return json.dumps(result, indent=2)


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    mcp.run(transport="stdio")
