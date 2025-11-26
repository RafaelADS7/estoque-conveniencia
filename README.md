# 📘 Next.js Fullstack - Gerenciador de Produtos (Aula Prática)

Este repositório contém o projeto final desenvolvido durante as aulas de **Desenvolvimento Web II**. O objetivo deste projeto é demonstrar a construção de uma aplicação moderna, segura e performática utilizando o ecossistema **Next.js (App Router)**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind-38bdf8)

---

## 🎯 O que aprendemos neste projeto?

Este não é apenas um CRUD simples. Ele implementa padrões de arquitetura e segurança utilizados no mercado de trabalho:

1. **Arquitetura Híbrida:** Mistura de *Server Components* (Performance/SEO) e *Client Components* (Interatividade).
2. **Server Actions:** A nova forma de realizar mutações (POST/PUT/DELETE) sem precisar criar APIs REST manuais.
3. **Autenticação Robusta:** Sistema de Login e Registro com **NextAuth.js**, Sessão via Cookies e Senhas Criptografadas (bcrypt).
4. **Banco de Dados:** Conexão com MongoDB Atlas usando Mongoose e o padrão **Singleton** (para evitar gargalos em ambiente Serverless).
5. **Segurança:** Rotas protegidas (Server Check) e validação de dados.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Função no Projeto |
| :--- | :--- |
| **Next.js 15** | Framework Fullstack (Frontend + Backend). |
| **TypeScript** | Tipagem estática para evitar erros bobos. |
| **Tailwind CSS** | Estilização rápida e responsiva. |
| **MongoDB Atlas** | Banco de dados na nuvem (NoSQL). |
| **Mongoose** | ODM para modelar e validar dados do banco. |
| **NextAuth (Auth.js)** | Gerenciamento de sessão e segurança. |
| **BcryptJS** | Criptografia de senhas (Hashing). |

---

## 🚀 Como rodar o projeto na sua máquina

### 1. Pré-requisitos

Certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Git](https://git-scm.com/)

### 2. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/matheuslima25/nextjs-fullstack.git
cd nextjs-fullstack
````

### 3\. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 4\. Configurar Variáveis de Ambiente (Importante\!)

O projeto precisa de chaves secretas para funcionar. Crie um arquivo chamado `.env.local` na raiz do projeto e preencha conforme abaixo:

```env
# Conexão com o Banco (Pegue no MongoDB Atlas)
MONGODB_URI="mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco"

# URL da aplicação (Em produção, mude para o domínio real)
NEXTAUTH_URL="http://localhost:3000"

# Chave secreta para encriptar os tokens de sessão
# Dica: Gere uma hash aleatória no terminal com: openssl rand -base64 32 ou em https://generate.plus/en/base64
NEXTAUTH_SECRET="sua-hash-secreta-aqui"
```

### 5\. Rodar o servidor

```bash
npm run dev
```

Acesse **<http://localhost:3000>** no seu navegador.

---

## 📂 Estrutura do Projeto (App Router)

Entenda onde cada peça do quebra-cabeça se encaixa:

```bash
src/
├── app/
│   ├── api/auth/[...nextauth]/ # Rota mágica do NextAuth (Login/Logout)
│   ├── dashboard/              # Página Privada (Server Component)
│   ├── login/                  # Página de Login (Client Component)
│   ├── register/               # Página de Registro
│   ├── actions.ts              # ⚡ SERVER ACTIONS (Backend Logic)
│   ├── layout.tsx              # Layout Global (Fontes, Metadata)
│   └── page.tsx                # Home Page
│
├── components/                 # Componentes de UI (Botões, Cards)
│   ├── ProductItem.tsx         # Componente com lógica de Edição
│   └── SignOutButton.tsx       # Botão de Sair
│
├── lib/                        # Configurações reutilizáveis
│   ├── auth.ts                 # Configuração do NextAuth
│   └── db.ts                   # Conexão Singleton com MongoDB
│
└── models/                     # Schemas do Mongoose (Tabelas)
    ├── User.ts
    └── Product.ts
```

---

## 🧠 Conceitos Chave Explicados

### ⚡ Server Actions (`actions.ts`)

No Next.js moderno, não precisamos necessariamente criar uma API (`/api/produtos`) para salvar dados. Criamos funções assíncronas com a diretiva `'use server'`. O Next.js cria automaticamente um endpoint seguro para nós.

* **Vantagem:** O código de backend fica junto do frontend, tipado e simples.

### 🔄 Singleton Pattern (`lib/db.ts`)

Em desenvolvimento, o Next.js recarrega os arquivos várias vezes (Hot Reload). Se abríssemos uma conexão com o banco a cada recarga, o MongoDB bloquearia nosso acesso. O padrão Singleton garante que **apenas uma** conexão seja aberta e reutilizada.

### 🔐 Proteção de Rotas

Protegemos as rotas de duas formas:

1. **Backend:** No `actions.ts`, verificamos `if (!session) return error`. Ninguém edita o banco sem estar logado.
2. **Frontend/Page:** No `dashboard/page.tsx`, usamos `getServerSession` e `redirect('/login')` para expulsar usuários não autenticados.

---

## 📝 Licença

Desenvolvido para fins educacionais. Sinta-se livre para usar, copiar e modificar.
