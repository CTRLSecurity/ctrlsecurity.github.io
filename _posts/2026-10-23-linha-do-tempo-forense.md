---
lang: pt
ref: linha-do-tempo-forense
title: "Linha do tempo forense: como correlacionar eventos sem inventar uma história"
description: "Um método para registrar fontes, normalizar horários e separar fatos observados de hipóteses."
tag: Forense
cover: dark
read: 4
---

Uma linha do tempo útil não é apenas uma lista de horários. Cada entrada precisa mostrar a **fonte**, o fuso, o evento observado e o grau de confiança. Sem isso, eventos próximos podem parecer relacionados por acaso.

## Preserve antes de interpretar

Trabalhe em cópias dos artefatos, registre a origem e calcule hashes dos arquivos coletados. Anote quando e por quem a coleta foi feita. Guarde os dados brutos para que outra pessoa consiga revisar a interpretação.

Em Windows, o evento de segurança **4688** pode registrar criação de processos quando a auditoria correspondente está ativada. A linha de comando exige configuração adicional. A ausência desse evento não prova que um processo não executou: a auditoria pode estar desativada, os registros podem ter sido sobrescritos ou a coleta pode estar incompleta.

## Normalize e correlacione

Converta os horários para um fuso comum, mas preserve o valor original. Documente relógios com desvio conhecido. Para cada hipótese, procure ao menos outra fonte independente, como logs de autenticação, telemetria de endpoint ou eventos de rede.

Uma tabela curta ajuda a evitar conclusões prematuras:

| Horário normalizado | Fonte | Observação | Interpretação |
| --- | --- | --- | --- |
| 10:14 UTC | Segurança 4688 | processo criado | execução observada, origem ainda indefinida |
| 10:15 UTC | proxy | conexão ao mesmo host | possível relação, exige correlação adicional |

Essa tabela é **ilustrativa**. Não representa um incidente real. No relatório, separe fatos confirmados, hipóteses e lacunas de coleta. Um log apagado ou ausente é uma limitação a investigar, não prova isolada de ação do atacante.

## Referência

- [Microsoft: Audit Process Creation e evento 4688](https://learn.microsoft.com/en-us/security-updates/securityadvisories/2015/3004375)
