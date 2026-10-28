---
lang: en
ref: smart-burp-mcp
title: "Smart Burp MCP: from HTTP capture to traceable evidence"
description: "How Smart Burp MCP Server connects AI clients to Burp with compact search, native IDs, and reviewed request sends."
tag: Tools
cover: dark
read: 7
---

An investigation in Burp starts with many messages and ends with a small set of relevant evidence. Between those points, context is easy to lose: copying a response without its request, mixing up two Repeater tabs, or treating an HTTP status as sufficient proof.

[Smart Burp MCP Server](https://github.com/thezakman/smart-mcp-server), developed by TheZakMan from PortSwigger's official MCP Server, connects Burp Suite to MCP clients such as Codex and Claude. It aims to make triage **more traceable and controlled**. The extension works with traffic already captured by Burp, exposes compact indexes, and retrieves message details only when needed.

## An investigation in five steps

**1. Narrow the traffic.** Filter Proxy history by host, path, method, status, color, or scope. A short metadata list helps find candidates without loading every response body into the client's context.

**2. Keep native IDs.** Proxy results carry Burp's identifier. Retrieve the request and response by the same ID, using bounded chunks for large messages. This is more reliable than citing a list position that can change with filters and new captures.

**3. Compare controls.** Put anonymous, invalid-credential, and valid-credential responses side by side. The comparison tools expose differences in status, headers, and JSON keys, but interpretation remains a human task: a status change alone does not confirm unauthorized access.

**4. Preserve context.** Open a captured message in Repeater or save evidence in Organizer with notes and colors. Creating a tab does not send target traffic. Smart Burp MCP can also inspect current Repeater states and labels association confidence when the origin of a send is uncertain.

**5. Review before sending.** For a request change, the extension displays the complete message and hashes the preview with SHA-256. Sending requires the matching preview and target approval. It sends one request at a time, without automatic batching or retries.

## Why the workflow matters

The useful part is not asking a model to "find vulnerabilities" on its own. It is using the client to navigate evidence, form hypotheses, and compare controls while Burp retains original traffic and IDs. The extension offers read-only investigation, core, and full compatibility tool profiles. It also supports Site Map, WebSocket history, Organizer, and Repeater and Intruder traffic workflows.

For connectivity, it provides a local Streamable HTTP endpoint at `/mcp`, with SSE and stdio proxy compatibility. Some features, including Scanner and Collaborator, require Burp Suite Professional. Captured content can contain cookies and tokens: masking is optional and tool-specific. Check scope and returned data before sharing a message with an AI client.

The open-source repository documents installation, profiles, limits, and examples. Start with its README, select a read-only profile to explore the indexes, and move to sending operations when the exact request and target are clear.

## References

- [Smart Burp MCP Server: repository and documentation](https://github.com/thezakman/smart-mcp-server)
- [PortSwigger MCP Server: upstream project](https://github.com/PortSwigger/mcp-server)
