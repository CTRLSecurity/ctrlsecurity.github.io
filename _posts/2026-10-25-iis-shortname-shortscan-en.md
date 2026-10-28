---
lang: en
ref: iis-shortname-shortscan
title: "IIS ShortName: from 8.3 enumeration to DLL recovery with shortscan"
description: "How short names help locate ASP.NET assemblies and when shortscan can recover DLL contents."
tag: AppSec
cover: blue
read: 9
---

An 8.3 short name can reveal that a file exists without revealing its full name. In ASP.NET applications, `/bin` is particularly interesting because it holds `.dll` assemblies containing much of the application's logic. But **finding a name**, **reconstructing the full name**, and **retrieving the DLL bytes** are distinct steps. Each needs its own evidence.

## The signal IIS leaks

In some configurations, IIS responds differently to a query for an existing 8.3 alias and one for an invented alias. A result such as `PORTAL~1.DLL` suggests a candidate in the queried directory, but does not establish whether its full name is `Portal.Core.dll`, `Portal.Admin.dll`, or something else. Alias generation depends on the volume, creation order, and collisions; guessing the long name from the prefix alone would be a mistake.

[shortscan](https://github.com/thezakman/shortscan) automates this enumeration and tries to reconstruct full names using autocomplete techniques and HTTP confirmation. The original project is by bitquark; the version maintained by TheZakMan extends the workflow to investigate **content retrieval**, including DLLs, when a separate exposure condition exists.

## When a name becomes content

[Arseniy Sharoglazov's research for PT SWARM](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/) described a specific ASP.NET chain: 8.3 enumeration helps locate files under `/bin`, while a *cookieless* session URL form can make a vulnerable application serve the protected DLL. The research credits Soroush Dalili for the original ShortName work and related scanner. **DLL retrieval does not follow automatically from enumeration**; it depends on ASP.NET behavior and server configuration.

In TheZakMan's shortscan version, discovery can feed a source-disclosure check. The tool looks for names in protected directories, attempts to reconstruct them, tests the read path with negative controls, and saves a file only when it receives matching content. A recovered DLL contains compiled code and metadata; retrieving it alone does not mean obtaining the original source files or achieving remote code execution.

## A more useful investigation flow

In an authorized test environment, start by checking for a ShortName signal. The current flag is `--is-vuln`:

```sh
shortscan --is-vuln https://iis.example.test/
```

If the differential is stable, investigate `/bin`. The `-i` mode includes directory-index namespace enumeration and the disclosure check; `--full-url` helps record discovered paths:

```sh
shortscan https://iis.example.test/bin -i \
  --autocomplete method --full-url \
  --loot-dir ./shortscan-evidence
```

If a full name has already been confirmed independently, test it directly instead of presenting a guess as a discovery:

```sh
shortscan --source-probe \
  https://iis.example.test/bin/Portal.Core.dll \
  --loot-dir ./shortscan-evidence
```

The names and domain above are fictional. `--source-probe` demonstrates exposure only when a response contains the expected bytes and nonexistent-file controls do not behave the same way. A patched installation may allow name enumeration while refusing every DLL retrieval attempt.

## Report the result precisely

1. **8.3 differential:** retain the candidate request and a nonexistent control in the same directory, with equivalent session, method, and headers.
2. **Long name:** state whether a verifiable response confirmed it or whether it remains a hypothesis. Do not assign a `~1` ordinal to a long name without confirmation.
3. **Content:** to claim disclosure, preserve the response containing the DLL, negative controls, and observed file type. An HTTP status alone is insufficient.

For remediation, address the two issues separately. Review the creation and presence of 8.3 aliases on the volume, assessing impact before removing them. Keep IIS and ASP.NET Framework updated, and inspect the module and *cookieless* session configuration that permits reads from protected directories. Disabling new aliases does not remove existing ones; preventing enumeration does not replace fixing a route that actually serves DLLs.

## References

- [shortscan: source, usage, and credits](https://github.com/thezakman/shortscan)
- [PT SWARM: Source Code Disclosure in ASP.NET apps](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/)
- [Microsoft: file naming and 8.3 aliases](https://learn.microsoft.com/en-us/windows/win32/FileIO/naming-a-file)
- [Microsoft: fsutil 8dot3name](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-8dot3name)
