---
lang: en
ref: linha-do-tempo-forense
title: "Forensic timelines: correlate events without inventing a story"
description: "A method to document sources, normalize timestamps, and separate observations from hypotheses."
tag: Forensics
cover: dark
read: 4
---

A useful timeline is more than a list of timestamps. Each entry needs a **source**, time zone, observed event, and confidence level. Otherwise, nearby events can look related by coincidence.

## Preserve before interpreting

Work from copies of the artifacts, record their origin, and hash the collected files. Note when and by whom collection took place. Retain raw data so another analyst can review your interpretation.

On Windows, security event **4688** can record process creation when the relevant auditing is enabled. Capturing the command line requires additional configuration. The absence of this event does not prove that a process never ran: auditing may be disabled, logs may have rolled over, or collection may be incomplete.

## Normalize and correlate

Convert timestamps to a common time zone while preserving original values. Document known clock drift. For each hypothesis, look for another independent source, such as authentication logs, endpoint telemetry, or network events.

A short table helps prevent premature conclusions:

| Normalized time | Source | Observation | Interpretation |
| --- | --- | --- | --- |
| 10:14 UTC | Security 4688 | process created | execution observed, origin unknown |
| 10:15 UTC | proxy | connection to the same host | possible relation, needs further correlation |

This table is **illustrative** and does not describe a real incident. In the report, distinguish confirmed facts, hypotheses, and collection gaps. A missing or cleared log is a limitation to investigate, not standalone proof of attacker action.

## Reference

- [Microsoft: Audit Process Creation and event 4688](https://learn.microsoft.com/en-us/security-updates/securityadvisories/2015/3004375)
