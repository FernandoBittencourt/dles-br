# Contribuindo

Obrigado por ajudar a curar dles em português. Esta lista é **independente**: entram jogos que atendem aos critérios, sem favoritismo de marca ou autor.

## Sugerir um jogo (jogadores)

Qualquer pessoa pode [indicar um jogo](https://github.com/FernandoBittencourt/dles-br/issues/new?template=sugerir-jogo.yml) que joga:

- Nome do jogo
- URL
- Por que é um dle (puzzle diário, mesmo desafio para todos)
- Idioma (PT-BR, PT-PT ou ambos)

A curadoria testa e adiciona se passar nos critérios. Label no GitHub: `sugestão`.

## Incluir jogo (criadores)

Se você **criou ou representa** o jogo, use o [formulário de criador](https://github.com/FernandoBittencourt/dles-br/issues/new?template=incluir-jogo-criador.yml). Label: `criador`.

Respondemos criadores mais rápido, mas **os critérios de entrada são os mesmos** para todos.

## Pull request

1. Edite `src/data/dles.json` (ordem alfabética por `name` ajuda na revisão).
2. Use descrições originais e curtas (não copie textos de marketing).
3. Confirme que o link abre e é gratuito no navegador.
4. `featured: true` só para jogos que você recomendaria no sorteio diário — o sorteio trata todos com peso igual.

### Ícone do jogo

- **Sugestão via issue** (sem PR): usamos o **favicon** do site do jogo, sem logo de terceiros no repositório.
- **PR do criador**: você pode incluir logo em `public/icons/<id>.svg` (ou `.png`) e referenciar em `dles.json` com `"icon": "/icons/<id>.svg"`. Só envie assets que você tem direito de usar.

## Critérios de curadoria

Entra:

- Interface ou conteúdo em português
- Um puzzle por dia (ou modo daily claro)
- Gratuito para jogar no browser

Fica de fora:

- Jogos só em inglês
- Apps que exigem instalação
- Links quebrados ou paywall no puzzle diário

## Código

- Mantenha o escopo pequeno — é um diretório, não um app complexo.
- Siga os tokens em `src/styles/tokens.css` para cores e tipografia.
