---
lang: pt
ref: smart-burp-mcp
title: "Smart Burp MCP: uma investigação que pode ser auditada"
description: "Um exemplo de triagem no Burp mostra como o Smart Burp MCP preserva contexto, compara controles e mantém cada ação rastreável."
tag: Ferramentas
cover: dark
read: 7
---

O Proxy do Burp acumulou centenas de requisições. Uma delas parece mostrar acesso a uma fatura de outro usuário. Há um `200` na resposta, mas isso ainda não é um achado: talvez a fatura seja pública, o usuário tenha permissão ou a resposta seja uma página de erro servida com status errado. Antes de escrever qualquer conclusão, é preciso encontrar a mensagem certa, recuperar os controles e preservar o que foi observado.

Esse é o problema que orienta o [Smart Burp MCP Server](https://github.com/thezakman/smart-mcp-server). A extensão criada por TheZakMan a partir do servidor MCP da PortSwigger conecta clientes como Codex e Claude ao estado do Burp. Seu diferencial está no fluxo de evidência: **índices compactos para localizar tráfego, IDs nativos para voltar à mensagem exata e operações explícitas para comparar ou enviar uma requisição revisada**.

## Da suspeita à mensagem certa

Imagine um teste **fictício** na rota `/api/faturas/`. O primeiro passo é procurar metadados, sem despejar corpos de resposta e credenciais no contexto do cliente:

```json
{"hostContains":"api.lab.test","pathPrefix":"/api/faturas/","methods":["GET"],"fields":["id","method","path","statusCode"],"count":10}
```

Esses são argumentos de `search_http_history`. O resultado pode apontar, por exemplo, os IDs `105` e `112`. Eles são IDs do histórico do Burp, não posições temporárias de uma lista filtrada. É possível pedir somente o request e a response de `112` com `get_http_exchange`, limitar o tamanho retornado e continuar de um `nextOffset` se a mensagem for grande:

```json
{"id":112,"parts":["REQUEST","RESPONSE"],"maxMessageChars":8000}
```

Agora a pergunta fica concreta: qual identidade enviou a requisição, qual recurso ela solicitou e quais dados a resposta realmente trouxe? Um resumo com `200` não responde isso. A mensagem completa responde, desde que seja interpretada junto com a titularidade do recurso e com controles comparáveis.

## Comparar antes de concluir

Suponha que `105` seja o acesso do titular à fatura e `112` o acesso da outra conta. `compare_http_exchanges` compara as duas respostas capturadas sem gerar tráfego novo:

```json
{"leftSource":"PROXY","leftId":105,"rightSource":"PROXY","rightId":112}
```

A comparação ajuda a localizar diferenças de status, headers e campos JSON. Ainda é preciso verificar se a conta de `112` não tinha direito legítimo àquele recurso e se o corpo devolveu dados da fatura, em vez de um envelope genérico. Requisições anônimas e com credencial inválida oferecem controles adicionais; o Smart Burp MCP tem uma comparação própria para o trio anônimo, token inválido e token válido. O relatório deve guardar os IDs e os pares request/response que sustentam cada afirmação.

Aqui aparece a vantagem sobre copiar e colar mensagens em uma conversa: o cliente pode partir de um índice pequeno, abrir apenas os itens relevantes e voltar ao registro original no Burp. A ferramenta também cobre Site Map, Organizer e tráfego observado de Repeater e Intruder. No Repeater, a associação a uma aba pode ser exata, provável ou ambígua; a extensão informa essa confiança em vez de inventar uma origem quando duas abas contêm pedidos iguais.

## O que acontece quando é preciso agir

Ler o histórico, comparar respostas e abrir uma requisição capturada no Repeater não envia nada ao alvo. Para testar uma alteração, o fluxo é diferente: `preview_request_mutation` monta a requisição completa e devolve seu SHA-256; `send_mutated_request` aceita apenas a versão que corresponde à prévia, respeita a aprovação do alvo e envia uma requisição por vez. A resposta pode ser recuperada pelo ID da troca e guardada no Organizer. Assim, a passagem de análise para tráfego novo fica visível.

A extensão também oferece sessões WebSocket gerenciadas: abre uma conexão aprovada pelo Burp, envia um frame revisado por vez, permite consultar mensagens recebidas e fecha a sessão explicitamente. Isso amplia o mesmo modelo de rastreabilidade para além de HTTP, sem transformar uma investigação em disparo automático de payloads.

## Limites que importam

O conteúdo capturado é devolvido sem mascaramento por padrão, inclusive cookies e tokens. O mascaramento é opcional e não cobre todos os formatos possíveis. Perfis de ferramentas reduzem as capacidades expostas ao cliente; o perfil somente leitura não oferece envio. Algumas ferramentas dependem do Burp Suite Professional. O histórico observado do Repeater também não equivale ao histórico completo de navegação interna do Burp.

O Smart Burp MCP encurta o caminho entre uma hipótese e sua evidência, mas não decide se há uma vulnerabilidade. Essa conclusão continua dependendo de controles, contexto de autorização e leitura da resposta real. A extensão ajuda a manter esses elementos ligados à mensagem original, que é o ponto mais difícil de preservar quando a investigação passa por um cliente de IA.

## Referências

- [Smart Burp MCP Server: código e documentação](https://github.com/thezakman/smart-mcp-server)
- [PortSwigger MCP Server: projeto de origem](https://github.com/PortSwigger/mcp-server)
