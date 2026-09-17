# Nóticias Panorama
Aplicação que tem como objetivo utilizar o Next.js para aplicações moveis, sendo este de nóticias e visualização de propagandas.

## 🚀 Next.js + Prisma + Vercel Blob

Aplicação desenvolvida com **Next.js**, utilizando **Prisma** para comunicação com o banco de dados e **Vercel Blob** para armazenamento de arquivos.

## 📋 Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) — versão 18 ou superior.
* npm, yarn, pnpm ou bun.
* Um banco de dados compatível com o Prisma.
* Uma conta na Vercel, caso utilize o Vercel Blob.
* Repositorio GitHub, para utilização do Vercel.

## 📦 Instalação

Clone o projeto:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
BLOB_READ_WRITE_TOKEN="seu_token_do_vercel_blob"
DATABASE_URL="sua_connection_string"
POSTGRES_URL="sua_connection_local_string"
```

### Prisma

A variável `DATABASE_URL` é utilizada pelo Prisma para realizar a conexão com o banco de dados.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meu_banco"
```

> A URL de conexão depende do banco de dados utilizado no projeto.

### Vercel Blob

A variável `BLOB_READ_WRITE_TOKEN` é utilizada para autenticar o acesso ao **Vercel Blob**.

Você pode obter esse token através do comando em seu projeto:
```
vercel env pull
```

> Nunca publique o arquivo `.env` criado no Git. Certifique-se de que `.env` esteja incluído no `.gitignore`. No maximo deixe um `.env.example` para modelo de quais variáveis vai utilizar.

## 🗄️ Configurando o Prisma

Depois de configurar a `DATABASE_URL`, execute:

```bash
npx prisma generate
```

Para aplicar as migrations existentes:

```bash
npx prisma migrate deploy
```

Durante o desenvolvimento, quando houver alterações no schema:

```bash
npx prisma migrate dev
```

Caso seja necessário apenas sincronizar o schema com o banco:

```bash
npx prisma db push
```

### Gerar o Prisma Client

Sempre que necessário, o Prisma Client pode ser regenerado com:

```bash
npx prisma generate
```

## ▶️ Iniciando a aplicação

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, normalmente, em:

```text
http://localhost:3000
```

## 📦 Vercel Blob

O **Vercel Blob** é utilizado para armazenar arquivos, como imagens, documentos e outros arquivos enviados pela aplicação.

Exemplo de upload:

```ts
import { put } from "@vercel/blob";

const blob = await put(
  "arquivo-exemplo.png",
  file,
  {
    access: "public",
  }
);

console.log(blob.url);
```

A aplicação precisa ter a variável:

```env
BLOB_READ_WRITE_TOKEN="seu_token"
```

configurada no ambiente.

## 🧪 Desenvolvimento

Para iniciar o projeto do zero em um ambiente de desenvolvimento:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name <Nome_migração>
npm run dev
```

Se o banco já estiver configurado e as migrations já existirem:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

## 🚀 Deploy na Vercel

Para realizar o deploy:

1. Faça o push do projeto para um repositório Git.
2. Acesse a Vercel.
3. Importe o repositório.
4. Configure as variáveis de ambiente.
5. Configure o banco de dados.
6. Configure o Vercel Blob.
7. Realize o deploy.

As principais variáveis que devem estar configuradas na Vercel são:

```env
DATABASE_URL="..."
BLOB_READ_WRITE_TOKEN="..."
```

Após configurar as variáveis, a Vercel poderá executar o processo de build da aplicação.

## ⚙️ Scripts

Os principais comandos disponíveis são:

| Comando                     | Descrição                                 |
| --------------------------- | ----------------------------------------- |
| `npm run dev`               | Inicia o servidor de desenvolvimento      |
| `npm run build`             | Cria a build de produção                  |
| `npm start`                 | Inicia a aplicação em produção            |
| `npx prisma generate`       | Gera o Prisma Client                      |
| `npx prisma migrate dev`    | Cria/aplica migrations em desenvolvimento |
| `npx prisma migrate deploy` | Aplica migrations em produção             |
| `npx prisma db push`        | Sincroniza o schema com o banco           |

## 🔒 Segurança

Nunca compartilhe ou versione informações sensíveis.

Não envie o `.env` para o Git:

```text
.env
.env.example
```

Utilize um `.env.example` para documentar as variáveis necessárias:

```env
DATABASE_URL=""
POSTGRES_URL=""
BLOB_READ_WRITE_TOKEN=""
```

Dessa forma, outros desenvolvedores conseguem saber quais variáveis precisam configurar sem ter acesso aos valores reais.

## 🛠️ Tecnologias

* **Next.js**
* **React**
* **TypeScript**
* **Prisma**
* **Vercel Blob**
* **Node.js**

## 📚 Referências

* Next.js: https://nextjs.org/docs
* Prisma: https://www.prisma.io/docs
* Vercel Blob: https://vercel.com/docs/storage/vercel-blob
* Vercel: https://vercel.com/docs
