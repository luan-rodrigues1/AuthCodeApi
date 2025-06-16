# AuthCode API

Esta é uma API de autenticação desenvolvida com Node.js, TypeScript, Express e TypeORM.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- MySQL ou PostgreSQL (banco de dados)

## Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd AuthCodeApi
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=3306 para MySQL
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
PORT=8080 escolha a porta que a aplicação vai rodar
```

## Executando a aplicação

### Modo de desenvolvimento

Para executar a aplicação em modo de desenvolvimento com hot-reload:

```bash
npm run dev
```

### Modo de produção

Para executar a aplicação em modo de produção:

```bash
npm start
```

## Migrações do Banco de Dados

### Criar uma nova migração

```bash
npm run migration:create src/migrations/NomeDaMigracao
```

### Gerar migração automaticamente

```bash
npm run migration:generate src/migrations/NomeDaMigracao
```

### Executar migrações pendentes

```bash
npm run migration:run
```

### Reverter última migração

```bash
npm run migration:revert
```

## Estrutura do Projeto

```
src/
  ├── controllers/    # Controladores da aplicação
  ├── entities/       # Entidades do TypeORM
  ├── migrations/     # Arquivos de migração
  ├── routes/         # Rotas da API
  ├── services/       # Serviços da aplicação
  ├── data-source.ts  # Configuração do TypeORM
  └── index.ts        # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL/MySQL
- Zod (validação de dados)
- Docker
