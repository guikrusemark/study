# 💰 ContaFácil - Sistema de Gestão Financeira

Um aplicativo completo de contabilidade pessoal desenvolvido com Next.js 15, NextAuth, MongoDB e TypeScript.

## 🚀 Recursos

- ✅ **Autenticação Completa** - Sistema de login e registro com NextAuth.js
- 💳 **Gestão de Transações** - Adicione, edite e exclua receitas e despesas
- 📊 **Relatórios Detalhados** - Visualize gráficos e análises das suas finanças
- 📈 **Controle de Investimentos** - Acompanhe seus investimentos e rentabilidade
- 🔒 **Segurança** - Senhas criptografadas com bcryptjs
- ✅ **Validação de Dados** - Validação robusta com Zod
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS
- 🌙 **Landing Page Atrativa** - Página pública profissional

## 🛠️ Tecnologias

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Autenticação:** NextAuth.js (Auth.js)
- **Banco de Dados:** MongoDB com Mongoose
- **Validação:** Zod
- **Ícones:** Lucide React
- **Formatação:** Biome
- **Runtime:** Bun

## 📋 Pré-requisitos

- [Bun](https://bun.sh/) instalado
- [MongoDB](https://www.mongodb.com/) (local ou MongoDB Atlas)

## 🔧 Instalação

1. Instale as dependências:
```bash
bun install
```

2. Configure as variáveis de ambiente:

Edite o arquivo `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/contabilidade
```

**Importante:** 
- Para gerar um `NEXTAUTH_SECRET` seguro, execute: `openssl rand -base64 32`
- Se usar MongoDB Atlas, substitua `MONGODB_URI` pela sua connection string

3. Inicie o servidor de desenvolvimento:
```bash
bun run dev
```

4. Acesse a aplicação:
```
http://localhost:3000
```

## 📊 Páginas

- **`/`** - Landing page pública
- **`/auth/signin`** - Login
- **`/auth/signup`** - Registro
- **`/dashboard`** - Dashboard principal
- **`/dashboard/transactions`** - Gerenciar transações
- **`/dashboard/reports`** - Relatórios e análises
- **`/dashboard/investments`** - Controle de investimentos
- **`/dashboard/settings`** - Configurações do usuário

## 🔐 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Transações
- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação
- `GET /api/transactions/[id]` - Obter transação
- `PUT /api/transactions/[id]` - Atualizar transação
- `DELETE /api/transactions/[id]` - Excluir transação

## 📝 Scripts

```bash
# Desenvolvimento
bun run dev

# Build de produção
bun run build

# Iniciar produção
bun run start

# Lint/format
bun run lint
bun run format
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático! ✨

## 📄 Licença

Este projeto está sob a licença MIT.

---

**🎉 ContaFácil - Sua solução completa para gestão financeira pessoal!**
