---
lang: pt
ref: iis-shortname-shortscan
title: "IIS ShortName: do alias 8.3 à DLL"
description: "Um diretório /bin pode parecer invisível. Veja como o shortscan liga a enumeração de nomes curtos à verificação de uma DLL exposta."
tag: AppSec
cover: blue
read: 7
---

Uma aplicação ASP.NET responde `404` para `/bin` e também para `/bin/Portal.Core.dll`. A primeira impressão é de que não há nada para investigar. Mas esse `404` só mostra que a rota direta foi bloqueada. Ele não diz se existe uma DLL no disco, nem se outra forma de acesso pode devolvê-la.

É nesse intervalo que a enumeração de nomes curtos do IIS se torna útil. E é também onde costuma surgir uma confusão: **encontrar `PORTAL~1.DLL` não é o mesmo que obter `Portal.Core.dll`**. O [shortscan](https://github.com/thezakman/shortscan) trabalha nas duas pontas dessa investigação: revela e reconstrói nomes, e a versão mantida por TheZakMan também verifica caminhos que podem entregar o conteúdo de arquivos protegidos.

## O que o alias realmente revela

O Windows pode manter um alias 8.3 ao lado do nome longo de um arquivo. Em algumas configurações, respostas do IIS a consultas com `~` diferem entre aliases existentes e inventados. Essa diferença funciona como um oráculo de existência. Ela não revela automaticamente o nome inteiro: `PORTAL~1.DLL` poderia corresponder a mais de um nome longo, e o número após o til depende de colisões e da ordem de criação dos arquivos.

O diretório `/bin` adiciona outra camada. O ASP.NET costuma impedir sua leitura direta, mas o namespace NTFS `::$INDEX_ALLOCATION` pode permitir a enumeração de nomes curtos dentro dele. A ferramenta usa esse sinal para descobrir candidatos e tenta reconstruir o nome longo com verificações por HTTP. A técnica de enumeração e o uso desse namespace antecedem o fork; a [pesquisa da PT SWARM](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/) credita esse trabalho a Soroush Dalili.

## O passo que muda o impacto

Arseniy Sharoglazov mostrou que, em aplicações ASP.NET vulneráveis, uma URL com segmentos de sessão *cookieless* pode ser interpretada de modo a alcançar uma DLL que a rota `/bin` normalmente protege. A pesquisa combinou a descoberta do arquivo com a leitura do seu conteúdo. Essa segunda etapa depende da versão e configuração do ASP.NET, incluindo o processamento de módulos gerenciados para requisições estáticas. **Um servidor pode permitir enumeração 8.3 e ainda bloquear a leitura da DLL.**

A versão de TheZakMan do shortscan incorpora essa verificação ao fluxo de investigação. Em vez de parar em “existe um alias”, ela pode seguir até um nome longo confirmado, testar a rota de disclosure com controles negativos e guardar os bytes recuperados em `--loot-dir` quando a leitura funciona. Há ainda `--source-probe` para testar um nome completo já conhecido. Isso recupera um assembly compilado, não os arquivos originais de C#; a análise posterior do binário pode, porém, revelar lógica, nomes e outros dados úteis.

## Como ficaria em um laboratório

Este exemplo é **hipotético**. Os nomes abaixo não são saída de uma avaliação real. Em um ambiente autorizado, uma varredura direcionada ao diretório protegido pode ser iniciada assim:

```sh
shortscan https://lab.example.test/bin -i \
  --full-url --loot-dir ./loot-shortscan
```

O resultado precisa ser lido em etapas:

| Observação | O que permite concluir |
| --- | --- |
| Um alias como `PORTAL~1.DLL` responde diferente de um alias inexistente no mesmo diretório. | Há um candidato 8.3. Ainda não há nome longo nem leitura de conteúdo. |
| `Portal.Core.dll` é reconstruído e confirmado por uma resposta específica. | Há um nome longo plausivelmente associado ao arquivo. A associação exata ao ordinal `~1` ainda exige prova própria. |
| A rota de disclosure devolve bytes `MZ` de um PE, enquanto controles de nomes inexistentes falham. | Há evidência de leitura da DLL. O conteúdo e a identidade do arquivo ainda precisam ser preservados e conferidos. |

Se o nome longo vier de outra fonte confiável, a etapa de leitura pode ser isolada:

```sh
shortscan --source-probe \
  https://lab.example.test/bin/Portal.Core.dll \
  --loot-dir ./loot-shortscan
```

Uma resposta `200` sozinha não fecha o caso: páginas de erro customizadas e respostas genéricas também podem retornar `200`. O arquivo salvo deve ter conteúdo compatível com uma DLL, e um nome inexistente de mesma forma não pode produzir o mesmo resultado. O caminho direto, o alias, a rota alternativa e os controles devem ser registrados separadamente.

## O que fica no relatório

O achado de ShortName pode ser apenas divulgação de nomes. A leitura da DLL é um achado diferente, com pré-requisitos e impacto próprios. Relate a sequência observada, a configuração relevante e a evidência da resposta que trouxe os bytes. Não trate a possibilidade de decompilar um assembly como prova de acesso ao repositório ou de execução remota.

Na correção, examine tanto os aliases 8.3 existentes quanto a rota de leitura do ASP.NET. Desativar a criação de novos aliases não remove os antigos; bloquear a enumeração não corrige uma configuração que ainda entrega DLLs por outro caminho. Atualize IIS e ASP.NET Framework e avalie o impacto antes de remover nomes 8.3 de volumes em uso.

## Referências

- [shortscan: implementação, opções e créditos](https://github.com/thezakman/shortscan)
- [PT SWARM: Source Code Disclosure in ASP.NET apps](https://ptswarm.com/blog/source-code-disclosure-in-asp-net-apps/)
- [Microsoft: aliases 8.3 no Windows](https://learn.microsoft.com/en-us/windows/win32/FileIO/naming-a-file)
- [Microsoft: fsutil 8dot3name](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/fsutil-8dot3name)
