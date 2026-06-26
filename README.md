# dles-br

Curadoria **independente** de jogos diários em português — dles no estilo Wordle.

**Site:** [dles.com.br](https://dles.com.br)

Cada dia um jogo é sorteado entre os listados; abaixo, a lista completa com links para jogar no navegador. Mesmas regras para todos: critérios públicos, sem destaque pago.

## O que é um dle?

Jogo web com um puzzle por dia, compartilhado por todos os jogadores. Você resolve, compartilha o resultado e volta amanhã.

## Como contribuir

### Sugerir um jogo (sem código)

Abra uma [issue](https://github.com/FernandoBittencourt/dles-br/issues/new) com:

- Nome e URL do jogo
- Idioma (PT-BR, PT-PT ou ambos)
- Por que é um dle (puzzle diário, gratuito no browser, mesmo desafio para todos)

A curadoria decide se entra na lista.

### Adicionar via pull request

1. Faça fork deste repositório
2. Clone o fork e crie uma branch
3. Edite `src/data/dles.json` (veja campos abaixo)
4. Confira os critérios em [CONTRIBUTING.md](./CONTRIBUTING.md)
5. Abra um PR com nome, URL e justificativa curta

Campos em `dles.json`:

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único (slug) |
| `name` | Nome exibido |
| `url` | Link direto para jogar |
| `description` | Uma frase em português (texto original, sem copiar marketing) |
| `category` | `palavras`, `logica`, `geografia`, `cultura`, `outros` |
| `featured` | `true` se entra no sorteio diário |

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
