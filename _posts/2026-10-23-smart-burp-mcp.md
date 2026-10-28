---
lang: pt
ref: smart-burp-mcp
title: "Smart Burp MCP: da captura HTTP à evidência rastreável"
description: "Como o Smart Burp MCP Server conecta clientes de IA ao Burp com busca compacta, IDs nativos e envio de requisições revisadas."
tag: Ferramentas
cover: dark
read: 7
---

Uma investigação no Burp começa com muitas mensagens e termina com poucas evidências relevantes. Entre esses pontos, é fácil perder contexto: copiar uma resposta sem o request correspondente, confundir duas abas do Repeater ou tratar um status HTTP como prova suficiente.

O [Smart Burp MCP Server](https://github.com/thezakman/smart-mcp-server), desenvolvido por TheZakMan a partir do MCP Server oficial da PortSwigger, conecta o Burp Suite a clientes MCP como Codex e Claude. Seu foco é tornar a triagem **mais rastreável e controlada**. A extensão usa os dados já capturados pelo Burp, expõe índices compactos e permite recuperar detalhes apenas quando necessários.

## Uma investigação em cinco passos

**1. Delimite o tráfego.** Filtre o histórico por host, caminho, método, status, cor ou escopo. Uma lista curta de metadados ajuda a localizar candidatos sem despejar todos os corpos de resposta no contexto do cliente.

**2. Guarde IDs nativos.** Cada resultado do Proxy usa o identificador do Burp. Recupere a requisição e a resposta pelo mesmo ID, em trechos limitados quando a mensagem for grande. Isso evita citar uma posição de lista que muda com filtros e novas capturas.

**3. Compare controles.** Coloque lado a lado respostas anônimas, com credencial inválida e com credencial válida. A ferramenta de comparação aponta diferenças de status, headers e chaves JSON, mas a interpretação continua humana: uma mudança de status, sozinha, não confirma acesso indevido.

**4. Preserve o contexto.** Encaminhe uma mensagem capturada para o Repeater ou salve a evidência no Organizer, com notas e cores. Criar uma aba não envia tráfego ao alvo. O Smart Burp MCP também consulta estados atuais do Repeater e marca a confiança da associação quando a origem de um envio não é inequívoca.

**5. Revise antes de enviar.** Para uma alteração de request, a extensão mostra a mensagem completa e calcula um SHA-256 da prévia. O envio aceita apenas a alteração correspondente à prévia e passa pelo controle de aprovação do alvo. A operação é uma requisição por vez, sem lote ou repetição automática.

## Por que isso muda o trabalho

O valor não está em pedir a um modelo que "ache vulnerabilidades" sozinho. Está em usar o cliente para navegar evidências, formular hipóteses e comparar controles, enquanto Burp mantém o tráfego original e os IDs. A extensão inclui perfis de ferramentas para investigação somente leitura, uso principal e compatibilidade completa. Também oferece busca em Site Map, histórico WebSocket, Organizer e tráfego de Repeater e Intruder.

Para conexões, há endpoint local Streamable HTTP em `/mcp`, além de compatibilidade SSE e proxy stdio. Algumas funções, como Scanner e Collaborator, dependem do Burp Suite Professional. O conteúdo capturado pode incluir cookies e tokens: o mascaramento é opcional e específico de cada ferramenta. Antes de compartilhar uma mensagem com um cliente de IA, confira o escopo e os dados retornados.

O projeto é código aberto e documenta instalação, perfis, limites e exemplos de uso. Comece pelo README, escolha um perfil de leitura para conhecer os índices e avance para operações de envio apenas quando a requisição e o alvo estiverem claros.

## Referências

- [Smart Burp MCP Server: repositório e documentação](https://github.com/thezakman/smart-mcp-server)
- [PortSwigger MCP Server: projeto de origem](https://github.com/PortSwigger/mcp-server)
