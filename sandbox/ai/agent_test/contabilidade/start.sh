#!/bin/bash

echo "🚀 Iniciando ContaFácil..."
echo ""

# Verifica se o MongoDB está rodando
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB não está rodando!"
    echo "📝 Para iniciar o MongoDB, execute:"
    echo "   sudo systemctl start mongod"
    echo "   ou"
    echo "   mongod --dbpath ~/data/db"
    echo ""
    exit 1
fi

echo "✅ MongoDB está rodando"
echo ""

# Verifica se .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local não encontrado!"
    echo "📝 Criando .env.local com valores padrão..."
    echo ""
    
    cat > .env.local << 'EOF'
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/contabilidade
EOF
    
    echo "✅ Arquivo .env.local criado!"
    echo "⚠️  IMPORTANTE: Altere NEXTAUTH_SECRET para um valor seguro!"
    echo "   Execute: openssl rand -base64 32"
    echo ""
fi

echo "🔧 Instalando dependências..."
bun install

echo ""
echo "🎨 Formatando código..."
bun run format

echo ""
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "📱 Acesse: http://localhost:3000"
echo ""

bun run dev