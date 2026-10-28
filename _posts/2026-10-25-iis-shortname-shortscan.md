---
lang: pt
ref: iis-shortname-shortscan
title: "IIS ShortName: da enumeração 8.3 à recuperação de DLLs com shortscan"
description: "Como nomes curtos ajudam a encontrar assemblies ASP.NET e quando o shortscan consegue recuperar uma DLL."
tag: AppSec
cover: blue
read: 9
---

Um nome curto 8.3 pode revelar que um arquivo existe sem revelar seu nome completo. Em aplicações ASP.NET, isso interessa especialmente no diretório `/bin`, onde ficam assemblies `.dll` com parte da lógica da aplicação. Mas há uma diferença decisiva entre **descobrir um nome**, **reconstruir o nome completo** e **obter os bytes da DLL**. Cada etapa exige evidência própria.

## O sinal que o IIS deixa escapar

Em certas configurações, o IIS responde de maneira diferente a consultas sobre um alias 8.3 existente e sobre um alias inventado. Um resultado como `PORTAL~1.DLL` indica um candidato no diretório consultado, mas não diz, sozinho, se o arquivo se chama `Portal.Core.dll`, `Portal.Admin.dll` ou outra coisa. A geração de aliases depende do volume, da ordem de criação e de colisões; inferir o nome longo apenas pelo prefixo seria um erro.

O [shortscan](https://github.com/thezakman/shortscan) automatiza essa enumeração e tenta reconstruir nomes completos com técnicas de autocomplete e confirmação por HTTP. O projeto original é de bitquark; a versão mantida por TheZakMan amplia o fluxo para investigar também **recuperação de conteúdo**, inclusive DLLs, quando uma segunda condição de exposição está presente.

## Quando o nome vira conteúdo

A [pesquisa de Arseniy Sharoglazov para a PT SWARM](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/) mostrou uma cadeia específica em ASP.NET: a enumeração 8.3 ajuda a localizar arquivos em `/bin`, enquanto uma forma de URL com sessões *cookieless* pode fazer uma aplicação vulnerável entregar a DLL protegida. A pesquisa atribui os estudos iniciais de ShortName e o scanner relacionado a Soroush Dalili. **A leitura da DLL não decorre automaticamente da enumeração**; depende do comportamento do ASP.NET e da configuração do servidor.

Na versão do shortscan mantida por TheZakMan, a descoberta pode alimentar uma verificação de *source disclosure*. A ferramenta procura nomes em diretórios protegidos, tenta reconstruí-los, testa a rota de leitura com controles negativos e só salva um arquivo quando recebe conteúdo compatível. Uma DLL recuperada contém código compilado e metadados; sua obtenção não significa, por si só, acesso ao código-fonte original nem execução remota.

## Um fluxo de investigação mais útil

Em um ambiente de teste autorizado, comece pelo sinal de ShortName. A flag atual é `--is-vuln`:

```sh
shortscan --is-vuln https://iis.example.test/
```

Se houver um diferencial estável, investigue `/bin`. O modo `-i` inclui a enumeração pelo namespace de índice do diretório e a cadeia de verificação de disclosure; `--full-url` ajuda a registrar os caminhos encontrados:

```sh
shortscan https://iis.example.test/bin -i \
  --autocomplete method --full-url \
  --loot-dir ./evidencias-shortscan
```

Se um nome longo já foi confirmado por outro meio, a verificação pode ser feita diretamente, sem confundir um palpite com uma descoberta:

```sh
shortscan --source-probe \
  https://iis.example.test/bin/Portal.Core.dll \
  --loot-dir ./evidencias-shortscan
```

Os nomes e o domínio acima são fictícios. `--source-probe` só demonstra exposição quando a resposta traz os bytes esperados e os controles de arquivo inexistente não reproduzem o mesmo resultado. Em uma instalação corrigida, a cadeia pode enumerar nomes e ainda assim não recuperar nenhuma DLL.

## Como relatar sem inflar o resultado

1. **Diferencial 8.3:** registre a requisição candidata e uma inexistente no mesmo diretório, com sessão, método e headers equivalentes.
2. **Nome longo:** marque se foi confirmado por uma resposta verificável ou se continua sendo hipótese. O ordinal `~1` também não deve ser atribuído a um nome longo sem confirmação.
3. **Conteúdo:** para afirmar disclosure, preserve a resposta que devolveu a DLL, os controles negativos e o tipo de arquivo observado. Um status HTTP isolado não basta.

Para corrigir, trate separadamente os dois problemas. Revise a criação e a presença de aliases 8.3 no volume, considerando o impacto antes de removê-los. Mantenha IIS e ASP.NET Framework atualizados e verifique a configuração de módulos e sessões *cookieless* que permite a leitura dos diretórios protegidos. Desativar novos aliases não apaga os existentes; impedir a enumeração também não substitui a correção de uma rota que efetivamente entrega DLLs.

## Referências

- [shortscan: código, uso e créditos](https://github.com/thezakman/shortscan)
- [PT SWARM: Source Code Disclosure in ASP.NET apps](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/)
- [Microsoft: nomes de arquivos e aliases 8.3](https://learn.microsoft.com/en-us/windows/win32/FileIO/naming-a-file)
- [Microsoft: fsutil 8dot3name](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-8dot3name)
