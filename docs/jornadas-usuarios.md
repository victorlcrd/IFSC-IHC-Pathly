# Mapeamento da Jornada do Usuário

> Documento com os fluxos principais das jornadas selecionadas para o Pathly.


# Ambos

Jornadas que podem ser realizadas tanto por usuários do tipo Aprendiz quanto por usuários do tipo Criador.


## 1. Fluxo da Interação: Criar Conta

**Objetivo do usuário:** criar uma conta no Pathly para acessar a plataforma, salvar dados e utilizar recursos conforme seu perfil.

**Tipo de usuário:** Aprendiz, Criador

```mermaid
graph TD
    A([Acessar Pathly]) --> B[Tela Inicial]
    B --> C[Clicar em Criar Conta]
    C --> D[Informar Nome, E-mail e Senha]
    D --> E[Confirmar Dados]
    E --> F{Dados Válidos?}
    F -->|Sim| G[Criar Conta]
    F -->|Não| H[Exibir Erro]
    H --> D
    G --> I[Selecionar Perfil de Uso]
    I --> J([Acessar Dashboard])
```

### Etapas resumidas

1. Acessar Pathly
2. Tela Inicial
3. Clicar em Criar Conta
4. Informar nome, e-mail e senha
5. Confirmar dados
6. Validar dados
7. Criar conta
8. Selecionar perfil de uso
9. Acessar dashboard


## 2. Fluxo da Interação: Fazer Login

**Objetivo do usuário:** acessar uma conta já existente para retomar suas atividades no Pathly.

**Tipo de usuário:** Aprendiz, Criador

```mermaid
graph TD
    A([Acessar Pathly]) --> B[Tela Inicial]
    B --> C[Clicar em Login]
    C --> D[Informar E-mail e Senha]
    D --> E[Confirmar Login]
    E --> F{Credenciais Válidas?}
    F -->|Sim| G[Carregar Dados do Usuário]
    F -->|Não| H[Exibir Erro de Login]
    H --> D
    G --> I{Perfil do Usuário}
    I -->|Aprendiz| J[Acessar Dashboard do Aprendiz]
    I -->|Criador| K[Acessar Dashboard do Criador]
```

### Etapas resumidas

1. Acessar Pathly
2. Tela Inicial
3. Clicar em Login
4. Informar e-mail e senha
5. Confirmar login
6. Validar credenciais
7. Carregar dados do usuário
8. Direcionar para dashboard conforme perfil


# Aprendiz

Jornadas relacionadas ao consumo de trilhas, avanço no aprendizado e acompanhamento de progresso.


## 3. Fluxo da Interação: Explorar Trilhas Disponíveis

**Objetivo do usuário:** encontrar uma trilha de aprendizado relevante para iniciar ou visualizar detalhes antes de se inscrever.

**Tipo de usuário:** Aprendiz

```mermaid
graph TD
    A([LOGIN]) --> B[Tela Inicial]
    B --> C[Acessar Explorar Trilhas]
    C --> D[Visualizar Lista de Trilhas]
    D --> E[Filtrar por Categoria, Nível ou Duração]
    E --> F[Selecionar uma Trilha]
    F --> G[Visualizar Detalhes da Trilha]
    G --> H[Analisar Módulos, Duração e Progresso Previsto]
    H --> I{Deseja Iniciar?}
    I -->|Sim| J[Iniciar ou Inscrever-se na Trilha]
    I -->|Não| K[Voltar para Lista de Trilhas]
    K --> D
    J --> L([Trilha Adicionada às Trilhas em Andamento])
```

### Etapas resumidas

1. Login
2. Tela Inicial
3. Acessar Explorar Trilhas
4. Visualizar lista de trilhas
5. Filtrar por categoria, nível ou duração
6. Selecionar uma trilha
7. Visualizar detalhes da trilha
8. Analisar módulos, duração e progresso previsto
9. Decidir se deseja iniciar
10. Iniciar ou inscrever-se na trilha
11. Trilha adicionada às trilhas em andamento


## 4. Fluxo da Interação: Concluir Trilha em Andamento

**Objetivo do usuário:** retomar uma trilha já iniciada, concluir os módulos restantes e receber a conclusão da trilha.

**Tipo de usuário:** Aprendiz

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


# Criador

Jornadas relacionadas à criação, organização e publicação de trilhas de aprendizado.


## 5. Fluxo da Interação: Criar uma Trilha

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
