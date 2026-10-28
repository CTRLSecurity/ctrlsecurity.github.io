---
lang: en
ref: smart-burp-mcp
title: "Smart Burp MCP: an investigation you can audit"
description: "A Burp triage example shows how Smart Burp MCP preserves context, compares controls, and keeps each action traceable."
tag: Tools
cover: dark
read: 7
---

Burp Proxy has collected hundreds of requests. One appears to show access to another user's invoice. The response has a `200`, but that is not yet a finding: perhaps the invoice is public, the user has permission, or an error page uses the wrong status code. Before writing a conclusion, the analyst needs the right message, comparable controls, and a record of what was actually observed.

This problem shapes [Smart Burp MCP Server](https://github.com/thezakman/smart-mcp-server). The extension built by TheZakMan from PortSwigger's MCP server connects clients such as Codex and Claude to Burp's state. Its distinctive workflow combines **compact indexes to locate traffic, native IDs to return to the exact message, and explicit operations to compare evidence or send one reviewed request**.

## From suspicion to the right exchange

Consider a **fictional** test of `/api/invoices/`. First, search metadata without loading response bodies and credentials into the client's context:

```json
{"hostContains":"api.lab.test","pathPrefix":"/api/invoices/","methods":["GET"],"fields":["id","method","path","statusCode"],"count":10}
```

These are arguments for `search_http_history`. The result might point to IDs `105` and `112`. They are Burp history IDs, not temporary positions in a filtered list. Ask `get_http_exchange` for only the request and response of `112`, cap the returned size, and follow `nextOffset` if the message is large:

```json
{"id":112,"parts":["REQUEST","RESPONSE"],"maxMessageChars":8000}
```

The question is now concrete: which identity sent the request, which resource did it ask for, and what data did the response actually contain? A summary with `200` cannot answer that. The full exchange can, when interpreted alongside resource ownership and comparable controls.

## Compare before concluding

Suppose `105` is the owner's access to the invoice and `112` is access from another account. `compare_http_exchanges` compares the two captured responses without creating new target traffic:

```json
{"leftSource":"PROXY","leftId":105,"rightSource":"PROXY","rightId":112}
```

The comparison helps locate differences in status, headers, and JSON fields. The analyst still has to establish that account `112` had no legitimate right to the resource and that the body contained invoice data rather than a generic envelope. Anonymous and invalid-credential requests provide further controls; Smart Burp MCP has a dedicated comparison for the anonymous, invalid-token, and valid-token trio. A report should retain the IDs and request/response pairs that support each claim.

This is the advantage over pasting messages into a chat: the client starts from a small index, opens only relevant items, and can return to the original Burp record. The extension also covers Site Map, Organizer, and observed Repeater and Intruder traffic. A Repeater tab association may be exact, probable, or ambiguous; the extension reports that confidence instead of inventing a source when two tabs contain identical requests.

## When the test needs an action

Reading history, comparing responses, and opening a captured request in Repeater do not send anything to the target. Testing a changed request is a different step: `preview_request_mutation` renders the complete request and returns its SHA-256; `send_mutated_request` accepts only the version matching that preview, applies target approval, and sends one request at a time. The response can be retrieved by exchange ID and saved in Organizer. The transition from analysis to new traffic remains visible.

The extension also offers managed WebSocket sessions. It opens a Burp-approved connection, sends one reviewed frame at a time, lets the client inspect received messages, and closes the session explicitly. This extends the same traceable workflow beyond HTTP without turning an investigation into automated payload delivery.

## Limits that matter

Captured content is returned without masking by default, including cookies and tokens. Masking is optional and cannot cover every format. Tool profiles reduce the capabilities exposed to a client; the read-only profile offers no sending tools. Some features require Burp Suite Professional. Observed Repeater states are not Burp's complete internal navigation history.

Smart Burp MCP shortens the path from a hypothesis to its evidence, but it does not decide whether a vulnerability exists. That conclusion still requires controls, authorization context, and the actual response. The extension helps keep those elements tied to the original message, which is the hardest part to preserve when an investigation moves through an AI client.

## References

- [Smart Burp MCP Server: source and documentation](https://github.com/thezakman/smart-mcp-server)
- [PortSwigger MCP Server: upstream project](https://github.com/PortSwigger/mcp-server)
