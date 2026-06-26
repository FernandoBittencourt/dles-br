# dles-br

Curadoria **independente** de jogos diários em português — dles no estilo Wordle.

**Site:** [dles.com.br](https://dles.com.br) · [Sobre](https://dles.com.br/sobre/) · [Sugerir jogo](https://dles.com.br/sugerir/)

Cada dia um jogo é sorteado entre os listados; abaixo, a lista completa com links para jogar no navegador. Mesmas regras para todos: critérios públicos, sem destaque pago.

## O que é um dle?

Jogo web com um puzzle por dia, compartilhado por todos os jogadores. Você resolve, compartilha o resultado e volta amanhã.

## Como contribuir

Os formulários de sugestão ficam no GitHub e exigem uma **conta gratuita**. Critérios completos e fluxo de código em [CONTRIBUTING.md](./CONTRIBUTING.md).

### Sugerir um jogo (jogadores)

Qualquer pessoa pode [indicar um jogo](https://github.com/FernandoBittencourt/dles-br/issues/new?template=sugerir-jogo.yml) que joga:

- Nome do jogo
- URL
- Por que é um dle (puzzle diário, gratuito no browser, mesmo desafio para todos)
- Idioma (PT-BR, PT-PT ou ambos)

A curadoria testa e adiciona se passar nos critérios.

### Incluir jogo (criadores)

Se você **criou ou representa** o jogo, use o [formulário de criador](https://github.com/FernandoBittencourt/dles-br/issues/new?template=incluir-jogo-criador.yml).

Respondemos criadores mais rápido, mas **os critérios de entrada são os mesmos** para todos. Para incluir **logo oficial**, abra também um pull request conforme [CONTRIBUTING.md](./CONTRIBUTING.md) (`dles.json` + `public/icons/`).

### Adicionar via pull request (código)

Para contribuir com código ou enviar logo junto com o jogo:

1. Faça fork e clone deste repositório.
2. Crie a branch a partir de `develop`: `git checkout develop && git pull && git checkout -b feat/jogo-exemplo`
3. Edite `src/data/dles.json` (veja campos abaixo) e confira os critérios em [CONTRIBUTING.md](./CONTRIBUTING.md).
4. Abra o PR para **`develop`**, não para `main`.
5. Um PR = uma mudança (um jogo ou uma feature).

O maintainer publica em produção com merge `develop` → `main`. Correção urgente em produção: branch `fix/...` → PR para `main`; depois sincronize `main` em `develop`.

Campos em `dles.json`:

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único (slug) |
| `name` | Nome exibido |
| `url` | Link direto para jogar |
| `description` | Uma frase em português (texto original, sem copiar marketing) |
| `category` | `palavras`, `logica`, `geografia`, `cultura`, `outros` |
| `featured` | `true` se entra no sorteio diário |
| `icon` | *(opcional)* Logo em `public/icons/`, **somente se você é o criador** no PR. Sem isso, o site usa o favicon do jogo |

## Rodar localmente

Requisitos: Node.js 22+

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Stack

- [Astro](https://astro.build) (site estático)
- Licença [MIT](./LICENSE)
