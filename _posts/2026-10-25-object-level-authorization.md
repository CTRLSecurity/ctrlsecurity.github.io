---
lang: en
ref: autorizacao-por-objeto
title: "Object-level authorization: testing an API beyond the status code"
description: "A simple matrix of users, resources, and actions for clear access-control evidence."
tag: AppSec
cover: blue
read: 4
---

An API can require login and still let one user access another user's resource. A useful test shows **who** sent the request, **which object** was requested, and **what outcome was expected**. An HTTP status alone is not enough.

## Prepare the matrix

Create two test accounts, A and B, with the same privileges. Give each account its own synthetic object, such as a document or order. If an admin role exists, add a third account. Record object identifiers and the access rule before sending requests.

| Session | Object | Expected result |
| --- | --- | --- |
| A | A's object | allowed |
| A | B's object | denied |
| B | B's object | allowed |
| none | A's object | denied |

Test write operations too, including updates and deletion of disposable objects. Compare response bodies, sizes, and observable effects. A `200` with an empty body differs from an actual read; a `403` may come from a proxy before the application route runs.

## Where enforcement belongs

The backend must check permission for the action and the **specific object** on every request. Hiding buttons in the frontend or using hard-to-guess identifiers does not provide authorization. For multi-tenant systems, include the tenant in decisions and queries, with default denial.

Keep the authorized control request, the unauthorized attempt, and both responses. Claim data exposure only when the response or a controlled effect proves access.

## Reference

- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
