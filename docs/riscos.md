# Registro de Riscos — Pathly

Este documento deve ser revisitado e atualizado ao final de cada sprint.

## 1. Critério de classificação

### Probabilidade

| Nível | Descrição |
|-|-|
| Baixa | Improvável de ocorrer na situação atual da equipe |
| Média | Pode ocorrer dependendo das circunstâncias |
| Alta | Pode acontecer se não tiver contenção |

### Impacto

| Nível | Descrição |
|-|-|
| Baixo | Atraso ou retrabalho pequeno que pode ser resolvido na sprint |
| Médio | Compromete uma ou mais funcionalidades do MVP |
| Alto | Compromete o prazo final |

### Prioridade

Baseado em probabilidade × impacto em níveis de prioridade

| | Impacto Baixo | Impacto Médio | Impacto Alto |
|-|-|-|-|
| **Prob. Alta** | Média | Alta | Crítica |
| **Prob. Média** | Baixa | Média | Alta |
| **Prob. Baixa** | Baixa | Baixa | Média |

---

## 2. Matriz de riscos

| ID | Risco | Probabilidade | Impacto | Prioridade |
|-|-|-|-|-|
| R01 | Sistema de gamificação não gerar engajamento esperado | Alta | Alto | **Crítica** |
| R02 | Atraso no setup do ambiente de desenvolvimento | Alta | Médio | **Alta** |
| R03 | Sobrecarga dos membros com outras disciplinas | Alta | Médio | **Alta** |
| R04 | Escopo crescendo além da capacidade da equipe | Média | Alto | **Alta** |
| R05 | Complexidade na modelagem da progressão em trilhas | Média | Médio | **Média** |
| R06 | Saída ou inatividade de membro da equipe | Baixa | Alto | **Média** |
| R07 | UX das trilhas visuais não ser intuitiva | Média | Médio | **Média** |

---

## 3. Detalhamento dos riscos

---

### R01 — Sistema de gamificação não gerar engajamento esperado

- **Natureza:** Produto
- **Descrição:** A gamificação (streaks, XP, conquistas) é o diferencial central do Pathly. Se os mecanismos não forem balanceados corretamente, os usuários podem não sentir motivação suficiente para retornar à plataforma.
- **Causa:** Falta de experiência da equipe em design de sistemas de gamificação. Balanceamento de recompensas é uma disciplina complexa.
- **Consequência:** O produto perde seu diferencial competitivo e se torna equivalente a um blog com exercícios, sem retenção de usuários.
- **Probabilidade:** Alta
- **Impacto:** Alto
- **Prioridade:** Crítica
- **Estratégia de mitigação:** Estudar referências consolidadas (Duolingo, Habitica, Khan Academy). Implementar gamificação de forma iterativa, testando com usuários reais a cada sprint. Começar com mecânicas simples (streak diário e XP) e evoluir.
- **Plano de contingência:** Caso a gamificação não gere resultados até a Sprint 4, simplificar para apenas barra de progresso e streak, focando em funcionalidade básica.
- **Responsável:** A definir

---

### R02 — Atraso no setup do ambiente de desenvolvimento

- **Natureza:** Tecnologia / Prazo
- **Descrição:** O ambiente de desenvolvimento integrado ainda não está configurado. Nenhuma issue de desenvolvimento pode avançar sem ele.
- **Causa:** A equipe está em fase de planejamento e documentação.
- **Consequência:** Cada semana de atraso no ambiente comprime o tempo disponível para implementação.
- **Probabilidade:** Alta
- **Impacto:** Médio
- **Prioridade:** Alta
- **Estratégia de mitigação:** Tratar a configuração do ambiente como prioridade máxima da Sprint 1. Documentar o setup para todos os membros.
- **Plano de contingência:** Definir um ambiente mínimo viável para desbloquear o restante da equipe.
- **Responsável:** A definir

---

### R03 — Sobrecarga dos membros com outras disciplinas

- **Natureza:** Equipe
- **Descrição:** Todos os membros estão em regime de dedicação parcial, conciliando este projeto com outras disciplinas do semestre.
- **Causa:** Contexto acadêmico com múltiplas disciplinas simultâneas.
- **Consequência:** Sprints não concluídas, acúmulo de dívida técnica e pressão crescente nas sprints finais.
- **Probabilidade:** Alta
- **Impacto:** Médio
- **Prioridade:** Alta
- **Estratégia de mitigação:** Revisar a capacidade da equipe no início de cada sprint. Priorizar sempre as issues de maior valor do MVP.
- **Plano de contingência:** Reduzir o escopo das sprints afetadas, preservando as funcionalidades essenciais.
- **Responsável:** Victor Gabriel Lacerda (Coordenador)

---

### R04 — Escopo crescendo além da capacidade da equipe

- **Natureza:** Escopo
- **Descrição:** Novas funcionalidades podem ser sugeridas ao longo do semestre sem avaliação criteriosa de impacto no prazo.
- **Causa:** Entusiasmo natural com o produto, feedback de entregas anteriores.
- **Consequência:** MVP incompleto ao final do semestre.
- **Probabilidade:** Média
- **Impacto:** Alto
- **Prioridade:** Alta
- **Estratégia de mitigação:** Qualquer nova funcionalidade deve passar por avaliação antes de entrar no backlog ativo. Manter o foco nas funcionalidades essenciais definidas no MVP.
- **Plano de contingência:** Sessão de repriorização com a equipe para cortar funcionalidades de menor impacto.
- **Responsável:** Victor Gabriel Lacerda (Coordenador)

---

### R05 — Complexidade na modelagem da progressão em trilhas

- **Natureza:** Tecnologia
- **Descrição:** A modelagem de trilhas com módulos sequenciais, pré-requisitos e progresso percentual pode se tornar mais complexa do que o previsto.
- **Causa:** A estrutura de dados para trilhas gamificadas envolve grafo de dependências entre módulos, tracking de progresso individual e cálculo de XP.
- **Consequência:** Retrabalho na modelagem e possível atraso na funcionalidade principal.
- **Probabilidade:** Média
- **Impacto:** Médio
- **Prioridade:** Média
- **Estratégia de mitigação:** Começar com modelo linear simples (módulos sequenciais sem branches). Validar a modelagem com protótipo antes de implementar.
- **Plano de contingência:** Simplificar para lista de módulos com checkbox de conclusão.
- **Responsável:** A definir

---

### R06 — Saída ou inatividade de membro da equipe

- **Natureza:** Equipe
- **Descrição:** Um ou mais membros podem se tornar inativos ao longo do semestre.
- **Causa:** Imprevistos pessoais ou sobrecarga acadêmica.
- **Consequência:** Redistribuição de tarefas, redução de capacidade.
- **Probabilidade:** Baixa
- **Impacto:** Alto
- **Prioridade:** Média
- **Estratégia de mitigação:** Documentar bem o código e as decisões técnicas. Evitar que funcionalidades críticas dependam de um único membro.
- **Plano de contingência:** Redistribuir as tarefas do membro inativo entre os demais, priorizando as funcionalidades essenciais do MVP.
- **Responsável:** Victor Gabriel Lacerda (Coordenador)

---

### R07 — UX das trilhas visuais não ser intuitiva

- **Natureza:** UX / Produto
- **Descrição:** A visualização de trilhas no estilo Duolingo pode não ser intuitiva para todos os perfis de usuário identificados nas personas (especialmente Sandra, 38 anos, em transição de carreira).
- **Causa:** Complexidade de criar uma interface visual que seja ao mesmo tempo gamificada e acessível.
- **Consequência:** Usuários podem não entender como navegar ou progredir nas trilhas, gerando abandono.
- **Probabilidade:** Média
- **Impacto:** Médio
- **Prioridade:** Média
- **Estratégia de mitigação:** Realizar testes de usabilidade com representantes das personas. Seguir princípios de IHC e heurísticas de Nielsen.
- **Plano de contingência:** Oferecer visualização alternativa em formato de lista para usuários que preferirem.
- **Responsável:** A definir

---

## 4. Riscos críticos no momento

Os riscos **R01** e **R02** são os mais críticos no estado atual do projeto:

- **R01** porque a gamificação é o diferencial central do Pathly e a equipe não tem experiência prévia em design de sistemas de recompensa.
- **R02** porque sem ambiente configurado nenhum desenvolvimento pode avançar, e o prazo já está em curso.

Ambos devem ser os primeiros a receber ação concreta na Sprint 1.
