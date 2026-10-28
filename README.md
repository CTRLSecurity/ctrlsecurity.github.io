# CTRL+SEC | ctrlsecurity.github.io

Site em Jekyll (nativo do GitHub Pages).

## Publicar
1. Envie todo o conteúdo desta pasta para a raiz do repositório `CTRLSecurity/ctrlsecurity.github.io`.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
3. Após a publicação, o site estará em https://ctrlsecurity.github.io

## Escrever um post
Crie um arquivo em `_posts/` com o nome `AAAA-MM-DD-slug.md`:

```md
---
lang: pt                  # pt ou en
ref: meu-post             # mesmo valor na versão PT e EN (liga o toggle de idioma)
title: "Título do post"
description: "Resumo de 1–2 frases (aparece nos cards e no topo do post)."
tag: AI Security          # categoria (usada nos filtros do blog)
cover: blue               # blue | yellow | dark
read: 6                   # minutos de leitura
---

Texto em Markdown. Use ## para seções, ``` para código, > para citações.
```

- Para a versão em inglês, crie outro arquivo com `lang: en` e o **mesmo `ref`**.
- A home mostra automaticamente os 3 posts mais recentes do idioma ativo.
- `/blog/` lista todos, com filtro por tag.
- Imagens: coloque em `assets/` e use `![alt](/assets/imagem.jpg)`.

## Rodar localmente (opcional)
```
bundle install
bundle exec jekyll serve
```
Abra http://localhost:4000
