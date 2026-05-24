# Jornadas dos Usuários

## Mapeamento da Jornada do Usuário

Documento com os fluxos principais das jornadas selecionadas para o Pathly.

---

## 1. Criar uma Trilha

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

---

## 2. Concluir Trilha em Andamento

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
