# Contribuindo

Obrigado por ajudar a curar dles em português. Esta lista é **independente**: entram jogos que atendem aos critérios, sem favoritismo de marca ou autor.

## Sugerir um jogo

Abra uma [issue](https://github.com/FernandoBittencourt/dles-br/issues/new) com:

- Nome do jogo
- URL
- Por que é um dle (puzzle diário, mesmo desafio para todos)
- Idioma (PT-BR, PT-PT ou ambos)

## Pull request

1. Edite `src/data/dles.json` (ordem alfabética por `name` ajuda na revisão).
2. Use descrições originais e curtas (não copie textos de marketing).
3. Confirme que o link abre e é gratuito no navegador.
4. `featured: true` só para jogos que você recomendaria no sorteio diário — o sorteio trata todos com peso igual.

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
