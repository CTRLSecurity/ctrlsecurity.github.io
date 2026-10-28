---
lang: pt
ref: autorizacao-por-objeto
title: "Autorização por objeto: como testar uma API sem confundir 403 com proteção"
description: "Uma matriz simples de usuários, recursos e ações para encontrar falhas de acesso com evidência clara."
tag: AppSec
cover: blue
read: 4
---

Uma API pode exigir login e ainda permitir que um usuário acesse o recurso de outro. O teste precisa mostrar **quem** fez a requisição, **qual objeto** foi pedido e **qual resultado era esperado**. Um status HTTP isolado não basta.

## Prepare a matriz

Crie duas contas de teste, A e B, com os mesmos privilégios. Cada uma deve ter um objeto próprio, como um documento ou pedido sintético. Se houver função administrativa, inclua uma terceira conta. Registre os identificadores e a regra de acesso antes de enviar requisições.

| Sessão | Objeto | Resultado esperado |
| --- | --- | --- |
| A | objeto de A | acesso permitido |
| A | objeto de B | acesso negado |
| B | objeto de B | acesso permitido |
| sem sessão | objeto de A | acesso negado |

Teste também ações de escrita, como alteração e exclusão, em objetos descartáveis. Compare corpo, tamanho e efeitos observáveis. Um `200` com resposta vazia pode ser diferente de uma leitura efetiva; um `403` pode vir de um proxy antes de a rota executar.

## Onde a verificação deve ocorrer

O backend deve conferir a permissão para a ação e o **objeto específico** em toda requisição. Esconder botões no frontend ou usar identificadores difíceis de adivinhar não resolve a autorização. Em sistemas com tenants, inclua o tenant na decisão e nas consultas, com negação por padrão.

Registre a requisição de controle autorizada, a tentativa não autorizada e a resposta de cada uma. Só descreva exposição de dados quando a resposta ou um efeito controlado comprovar o acesso.

## Referência

- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
