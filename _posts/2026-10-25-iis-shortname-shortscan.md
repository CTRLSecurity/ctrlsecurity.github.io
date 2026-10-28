---
lang: pt
ref: iis-shortname-shortscan
title: "IIS ShortName: o que a enumeração 8.3 revela e onde entra o shortscan"
description: "Entenda o sinal por trás dos nomes curtos do Windows, use o shortscan com controles e interprete o resultado sem exagerar o impacto."
tag: AppSec
cover: blue
read: 7
---

Alguns volumes Windows podem manter um nome curto no formato 8.3 ao lado do nome completo de um arquivo. Um arquivo chamado `relatorio-financeiro.aspx`, por exemplo, pode ter um alias curto gerado pelo sistema. O alias exato depende do diretório, das colisões e da configuração do volume; não é seguro adivinhá-lo a partir do nome longo.

Em certas combinações de IIS, sistema de arquivos e configuração, requisições com `~` produzem respostas diferentes para prefixos de nomes curtos existentes e inexistentes. Essa diferença permite **inferir partes de nomes** que a aplicação não pretendia listar. O problema aparece na observação do comportamento do servidor, não no simples fato de um nome conter til.

## O que uma descoberta significa

Encontrar um prefixo compatível com 8.3 pode revelar estrutura de diretórios ou nomes prováveis. Isso pode orientar outras verificações, mas **não prova leitura do arquivo, acesso ao código-fonte ou execução de comandos**. Para afirmar exposição de conteúdo, seria necessária uma requisição separada que devolvesse o conteúdo esperado, com controles apropriados. Bloqueios por WAF, respostas de cache e páginas de erro personalizadas também podem produzir diferenças enganosas.

## Onde o shortscan ajuda

O [shortscan](https://github.com/thezakman/shortscan), desenvolvido por bitquark e TheZakMan, automatiza a detecção e a enumeração de nomes curtos em IIS. Depois de identificar um nome curto, tenta reconstruir o nome completo por métodos de autocomplete. O projeto também documenta uma técnica de correspondência por checksum para alguns casos de colisão de nomes curtos.

Em um ambiente autorizado, comece com a verificação de exposição antes de fazer enumeração completa:

```sh
shortscan --isvuln https://iis.example.test/
```

Se o sinal for estável e a enumeração estiver no escopo, execute uma varredura direcionada. `--fullurl` facilita registrar o caminho de um arquivo confirmado; `--autocomplete auto` deixa a ferramenta escolher a estratégia de reconstrução.

```sh
shortscan --fullurl --autocomplete auto https://iis.example.test/app/
```

Esses comandos são exemplos. Ajuste taxa, cabeçalhos e caminho conforme o ambiente e o escopo. O primeiro teste também envia requisições; não o trate como uma análise puramente local.

## Como validar o resultado

1. Compare um prefixo candidato com prefixos inexistentes, usando o mesmo método, headers e sessão.
2. Repita a comparação no mesmo diretório. Mudanças de rota ou de camada de cache invalidam o controle.
3. Guarde as requisições e respostas que sustentam cada inferência, inclusive os resultados negativos.
4. Separe no relatório três níveis: comportamento diferencial, nome curto enumerado e nome longo confirmado.

Na correção, investigue primeiro a configuração do IIS e dos volumes envolvidos. O Windows permite consultar e controlar a criação de nomes 8.3 com `fsutil 8dot3name`. Desativar a criação futura não remove automaticamente aliases existentes. Removê-los sem análise pode quebrar aplicações que ainda dependem deles; a própria Microsoft recomenda avaliar impacto e preservar backup antes dessa operação.

## Referências

- [shortscan: código, uso e créditos](https://github.com/thezakman/shortscan)
- [Microsoft: nomes de arquivos e aliases 8.3](https://learn.microsoft.com/en-us/windows/win32/FileIO/naming-a-file)
- [Microsoft: fsutil 8dot3name](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-8dot3name)
