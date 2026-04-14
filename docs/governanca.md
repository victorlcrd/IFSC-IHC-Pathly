# Governança do Repositório — Pathly

## Papéis e Responsabilidades
Com base na divisão de papéis da equipe, as responsabilidades são as seguintes:
- **Coordenador** (Victor Gabriel Lacerda): Facilita cerimônias ágeis, garante aderência ao processo, resolve impedimentos e coordena comunicação entre equipe e stakeholders.
- **Demais membros**: João Pedro Callegaro, Lucas de Leon e Victor Blum atuam no design, desenvolvimento e testes da plataforma.

## Regras básicas
- Proibido commit direto na main (tudo entra por PR).
- Branches:
  - feature/<id>-<resumo>
  - fix/<id>-<resumo>
  - chore/<id>-<resumo>
- Commits devem seguir convenção: `<tipo>: descrição` (ex.: `feat: adiciona sistema de XP`).

## DoD do PR (mínimo)
- Descrição: o que mudou, por quê e como testar.
- Auto-review: checklist + comentários técnicos no PR.
- Aprovação obrigatória de pelo menos um membro da equipe.

## Review (critérios)
- Comentários devem explicar o motivo e sugerir alternativa quando possível.
- Evitar PR grande: se não revisa em ~10 min, dividir.

## Controle de Qualidade
### Testes
- Todos os PRs devem incluir testes unitários e de integração.
- Cobertura mínima de 80% para código novo.
- Testes e2e para funcionalidades críticas.

### Linting e Formatação
- Formatação automática configurada.
- Commits devem passar no linting.

## Documentação
- README.md atualizado com setup, arquitetura e contribuição.
- Documentação de API se aplicável.
- Comentários no código para funções complexas.

## Versionamento
- Seguir SemVer para releases.
