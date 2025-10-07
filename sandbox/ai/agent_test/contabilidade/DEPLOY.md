# 🚀 Guia de Deploy - ContaFácil

## Opções de Deploy

### 1. 🚀 Vercel (Recomendado)

Vercel é a plataforma oficial do Next.js e oferece deploy gratuito.

#### Passo a Passo:

1. **Crie uma conta no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Configure MongoDB Atlas:**
   - Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Crie um cluster gratuito
   - Obtenha sua connection string
   - Adicione IP `0.0.0.0/0` aos IPs permitidos (para Vercel)

3. **Prepare o repositório:**
   ```bash
   git add .
   git commit -m "Deploy: ContaFácil app"
   git push origin main
   ```

4. **Importe no Vercel:**
   - Clique em "New Project"
   - Selecione seu repositório
   - Configure as variáveis de ambiente:
     - `NEXTAUTH_SECRET`: Gere com `openssl rand -base64 32`
     - `NEXTAUTH_URL`: URL do deploy (ex: https://contafacil.vercel.app)
     - `MONGODB_URI`: Sua connection string do MongoDB Atlas

5. **Deploy:**
   - Clique em "Deploy"
   - Aguarde alguns minutos
   - Acesse sua aplicação! 🎉

#### Variáveis de Ambiente na Vercel:

```env
NEXTAUTH_SECRET=<seu-secret-aleatorio-de-32-caracteres>
NEXTAUTH_URL=https://seu-app.vercel.app
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/contabilidade?retryWrites=true&w=majority
```

### 2. 🐳 Docker

Crie um `Dockerfile`:

```dockerfile
FROM oven/bun:1 as base

WORKDIR /app

# Instalar dependências
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copiar código
COPY . .

# Build
RUN bun run build

# Expor porta
EXPOSE 3000

# Iniciar
CMD ["bun", "run", "start"]
```

Build e run:

```bash
docker build -t contafacil .
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET=seu-secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e MONGODB_URI=sua-connection-string \
  contafacil
```

### 3. 📦 VPS (DigitalOcean, AWS, etc)

#### Pré-requisitos:
- VPS com Ubuntu 22.04+
- Node.js 18+ ou Bun
- MongoDB instalado ou Atlas
- Nginx (opcional)
- PM2 (opcional)

#### Instalação:

1. **Conecte ao VPS:**
   ```bash
   ssh user@seu-servidor
   ```

2. **Instale Bun:**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   source ~/.bashrc
   ```

3. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/contafacil.git
   cd contafacil
   ```

4. **Instale dependências:**
   ```bash
   bun install
   ```

5. **Configure .env.local:**
   ```bash
   cp .env.example .env.local
   nano .env.local
   ```

6. **Build:**
   ```bash
   bun run build
   ```

7. **Inicie com PM2:**
   ```bash
   npm install -g pm2
   pm2 start "bun run start" --name contafacil
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx (opcional):**
   ```nginx
   server {
       listen 80;
       server_name seu-dominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 4. 🌐 Netlify

1. **Build Settings:**
   - Build command: `bun run build`
   - Publish directory: `.next`

2. **Variáveis de Ambiente:**
   Adicione as mesmas variáveis do Vercel

3. **Deploy:**
   - Push para GitHub
   - Conecte no Netlify
   - Deploy automático

### 5. ☁️ Railway

1. **Acesse [railway.app](https://railway.app)**
2. **Create New Project**
3. **Deploy from GitHub**
4. **Adicione variáveis de ambiente**
5. **Deploy automático!**

## 🔐 Segurança em Produção

### Checklist de Segurança:

- [ ] Alterar `NEXTAUTH_SECRET` para um valor forte e único
- [ ] Usar HTTPS (SSL/TLS)
- [ ] Configurar CORS adequadamente
- [ ] Limitar IPs no MongoDB
- [ ] Usar senhas fortes no MongoDB
- [ ] Habilitar rate limiting
- [ ] Configurar CSP (Content Security Policy)
- [ ] Desabilitar `X-Powered-By` header
- [ ] Usar variáveis de ambiente, nunca hardcode
- [ ] Fazer backup regular do banco de dados

### Gerar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## 📊 Monitoramento

### Vercel Analytics:
- Já integrado automaticamente
- Acesse Analytics no dashboard

### Sentry (Erro Tracking):
```bash
bun add @sentry/nextjs
```

### Google Analytics:
Adicione o script no `app/layout.tsx`

## 🔄 CI/CD

### GitHub Actions (exemplo):

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: bun run lint
```

## 📱 PWA (Progressive Web App)

Para transformar em PWA:

1. **Instale next-pwa:**
   ```bash
   bun add next-pwa
   ```

2. **Configure em next.config.ts**

3. **Adicione manifest.json**

4. **Adicione service worker**

## 🌍 Domínio Customizado

### Vercel:
1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure DNS (CNAME para vercel.app)

### Cloudflare (Recomendado):
- Proteção DDoS
- CDN global
- SSL gratuito
- Analytics

## 📈 Performance

### Otimizações:
- [x] Next.js Image Optimization
- [x] Tailwind CSS com purge
- [x] Lazy loading de componentes
- [ ] Adicionar Redis para cache
- [ ] CDN para assets estáticos
- [ ] Compressão gzip/brotli

## 🆘 Troubleshooting

### Erro: MongoDB Connection Failed
- Verifique a connection string
- Verifique IPs permitidos no Atlas
- Verifique usuário e senha

### Erro: NEXTAUTH_SECRET missing
- Adicione a variável de ambiente
- Regenere com `openssl rand -base64 32`

### Erro: Build Failed
- Execute `bun run build` localmente
- Verifique logs de erro
- Valide TypeScript

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação do Next.js
- Verifique os logs de erro

---

**🎉 Boa sorte com o deploy!**