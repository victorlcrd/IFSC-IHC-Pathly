# Jornadas dos Usuários

# Mapeamento da Jornada do Usuário

Documento com os fluxos principais das jornadas selecionadas para o Pathly.

---

## 1. Fluxo da Interação: Criar uma Trilha

**Objetivo do usuário:** criar e publicar uma nova trilha de aprendizado no Pathly.

**Tipo de usuário:** Criador

```mermaid
graph TD
    A([LOGIN]) --> B[Tela Inicial]
    B --> C[Criar Nova Trilha]
    C --> D[Informar Dados da Trilha]
    D --> E[Adicionar Módulos]
    E --> F[Adicionar Aulas e Atividades]
    F --> G[Organizar Estrutura da Trilha]
    G --> H[Visualizar Preview]
    H --> I[Publicar Trilha]
    I --> J([Receber Confirmação de Publicação])
```

### Etapas resumidas

1. Login
2. Tela Inicial
3. Criar Nova Trilha
4. Informar dados da trilha
5. Adicionar módulos
6. Adicionar aulas e atividades
7. Organizar estrutura da trilha
8. Visualizar preview
9. Publicar trilha
10. Receber confirmação de publicação

---

## 2. Fluxo da Interação: Concluir Trilha em Andamento

**Objetivo do usuário:** retomar uma trilha já iniciada, concluir os módulos restantes e receber a conclusão da trilha.

**Tipo de usuário:** Aluno

```mermaid
graph TD
    A([LOGIN]) --> B[Tela Inicial]
    B --> C[Acessar Trilhas em Andamento]
    C --> D[Selecionar Trilha em Andamento]
    D --> E[Abrir Próximo Módulo]
    E --> F[Consumir Aula ou Conteúdo]
    F --> G[Realizar Atividade ou Desafio]
    G --> H[Concluir Módulo]
    H --> I[Acompanhar Progresso da Trilha]
    I --> J[Finalizar Último Módulo]
    J --> K[Receber Conclusão da Trilha]
    K --> L([Obter Certificado ou Badge])
```

### Etapas resumidas

1. Login
2. Tela Inicial
3. Acessar trilhas em andamento
4. Selecionar trilha em andamento
5. Abrir próximo módulo
6. Consumir aula ou conteúdo
7. Realizar atividade ou desafio
8. Concluir módulo
9. Acompanhar progresso da trilha
10. Finalizar último módulo
11. Receber conclusão da trilha
12. Obter certificado ou badge

---