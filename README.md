# AuthCode API

Esta é uma API de autenticação desenvolvida com Node.js, TypeScript, Express e TypeORM.

Link da API em produção:  
➡️ https://authcode-api-77008956635.us-central1.run.app  

Acesse a doc para fazer requisições diretamente:  
➡️ [Ir para a documentação da API](#documentação-da-api)  


Esta é uma aplicação Full Stack, Acesse o Front-end através dos links abaixo: 

Link do repositório GitHub Front-end:   
➡️ [Ir para o repositório](https://github.com/luan-rodrigues1/AuthCodeApp)  

Link para instalar o arquivo .APK:  
➡️ [Ir para o dowload](https://drive.google.com/file/d/1pQ2Snv4_sRhIW8Iexz9xvwUmsUKm92PN/view?usp=sharing)  

## Pré-requisitos

- Node.js
- npm
- MySQL

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
  ├── data-source.ts  # Configuração de conexão com o banco
  └── index.ts        # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- Zod (validação de dados)
- Docker

## Documentação da API

### Endpoints

#### 1. Enviar Código de Verificação

```http
POST /auth/send-code
```

**Body:**

```json
{
  "email": "usuario@exemplo.com"
}
```

**Resposta (201 OK):**

```json
{
  "message": "Code sent successfully!"
}
```

#### 2. Verificar Código

```http
PATCH /auth/verify-code
```

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "code": "123456"
}
```

**Resposta (200 OK):**

```json
{
  "message": "Code verified successfully!"
}
```

**Observações:**

- O código de verificação deve conter exatamente 6 dígitos
- O código expira em 15 minutos
- O email deve ser válido
- Todas as requisições devem incluir o header `Content-Type: application/json`
