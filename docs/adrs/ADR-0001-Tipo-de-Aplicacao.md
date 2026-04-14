# ADR-0001 — Tipo de Aplicação

## Status
Aceito

## Contexto
Precisa ser definido o tipo de aplicação que o projeto Pathly será. A decisão considera o público-alvo identificado nas personas (estudantes mobile-first, profissionais em transição de carreira, professores e criadores de conteúdo).

## Decisão
A equipe decidiu que o projeto será primeiramente uma aplicação web.

## Alternativas consideradas
- Aplicação desktop
- Aplicativo mobile nativo
- Progressive Web App (PWA)

## Consequências
### Positivas
- Consolidação de aprendizado já desenvolvido do grupo
- Acessível em qualquer dispositivo com navegador
- Sem necessidade de colocar a aplicação em alguma loja de aplicativos
- Iteração mais rápida no desenvolvimento

### Negativas / trade-offs
- Estar preso a ter o acesso de clientes somente em navegadores
- Uma das personas (Cleiton, estudante mobile-first) pode preferir um app nativo
- Sem notificações push nativas para gamificação (ex: lembretes de streak)

## Revisão futura
A decisão poderá ser revista caso a aplicação apresente muitos problemas no ambiente web ou caso se identifique que uma PWA seria mais adequada para as funcionalidades de gamificação (notificações push, modo offline).
