---
lang: en
ref: iis-shortname-shortscan
title: "IIS ShortName: from an 8.3 alias to a DLL"
description: "A /bin directory can look invisible. See how shortscan connects short-name enumeration to verification of an exposed DLL."
tag: AppSec
cover: blue
read: 7
---

An ASP.NET application returns `404` for `/bin` and for `/bin/Portal.Core.dll`. At first, there seems to be nothing to investigate. But that `404` only tells us the direct route was blocked. It says nothing about whether a DLL exists on disk or whether another route can return it.

This is where IIS short-name enumeration becomes useful, and where a common mistake begins: **finding `PORTAL~1.DLL` is not the same as obtaining `Portal.Core.dll`**. [shortscan](https://github.com/thezakman/shortscan) works across both ends of the investigation. It discovers and reconstructs names, while the version maintained by TheZakMan also checks paths that may return the contents of protected files.

## What the alias actually reveals

Windows may keep an 8.3 alias alongside a file's long name. In some configurations, IIS responds differently to queries for existing and invented aliases containing `~`. That difference is an existence oracle. It does not automatically disclose the entire filename: `PORTAL~1.DLL` could have several candidate long names, and the digit after the tilde depends on collisions and file creation order.

The `/bin` directory adds another layer. ASP.NET normally blocks direct reads, but the NTFS `::$INDEX_ALLOCATION` namespace can make short names inside that directory enumerable. The tool uses that signal to find candidates and attempts to reconstruct long names with HTTP checks. Short-name enumeration and this namespace technique predate the fork; [PT SWARM's research](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/) credits Soroush Dalili for that work.

## The step that changes the impact

Arseniy Sharoglazov showed that, on vulnerable ASP.NET applications, a URL with *cookieless* session segments can be interpreted in a way that reaches a DLL normally protected by the `/bin` route. The research combined file discovery with content retrieval. This second step depends on ASP.NET version and configuration, including managed-module processing for static requests. **A server may allow 8.3 enumeration while still blocking DLL retrieval.**

TheZakMan's shortscan version incorporates this check into the investigation flow. Instead of stopping at “an alias exists,” it can proceed to a confirmed long name, test a disclosure route with negative controls, and save recovered bytes under `--loot-dir` when the read succeeds. It also offers `--source-probe` for a full name already known. This retrieves a compiled assembly, not the original C# files; subsequent binary analysis may still reveal application logic, names, and other useful data.

## A laboratory walkthrough

This example is **hypothetical**. The names below are not output from a real assessment. In an authorized environment, a scan focused on the protected directory can start like this:

```sh
shortscan https://lab.example.test/bin -i \
  --full-url --loot-dir ./shortscan-loot
```

Interpret the result in stages:

| Observation | Supported conclusion |
| --- | --- |
| An alias such as `PORTAL~1.DLL` responds differently from a nonexistent alias in the same directory. | There is an 8.3 candidate. No long name or content read has been established. |
| `Portal.Core.dll` is reconstructed and confirmed by a specific response. | There is a plausible long name associated with the file. Its exact association with ordinal `~1` still needs separate proof. |
| The disclosure route returns `MZ` bytes from a PE while nonexistent-name controls fail. | There is evidence of a DLL read. Preserve and check the content and file identity. |

If the long name came from another reliable source, isolate the read check:

```sh
shortscan --source-probe \
  https://lab.example.test/bin/Portal.Core.dll \
  --loot-dir ./shortscan-loot
```

A `200` response alone does not close the case: custom error pages and generic responses can also return `200`. The saved file should contain DLL-compatible bytes, and a nonexistent name of the same shape must not produce the same result. Record the direct path, alias, alternative route, and controls separately.

## What belongs in the report

A ShortName finding may only disclose names. A DLL read is a different finding with its own prerequisites and impact. Report the observed sequence, relevant configuration, and response evidence containing the bytes. Do not present the possibility of decompiling an assembly as proof of repository access or remote execution.

For remediation, examine both existing 8.3 aliases and the ASP.NET read route. Disabling the creation of new aliases does not remove old ones; blocking enumeration does not fix a configuration that still serves DLLs through another route. Update IIS and ASP.NET Framework, and assess impact before removing 8.3 names from volumes in use.

## References

- [shortscan: implementation, options, and credits](https://github.com/thezakman/shortscan)
- [PT SWARM: Source Code Disclosure in ASP.NET apps](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/)
- [Microsoft: 8.3 aliases on Windows](https://learn.microsoft.com/en-us/windows/win32/FileIO/naming-a-file)
- [Microsoft: fsutil 8dot3name](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-8dot3name)
