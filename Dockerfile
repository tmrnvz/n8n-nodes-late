# n8n'in en güncel resmi imajını temel al
FROM n8nio/n8n:latest

# Kök kullanıcıya geçerek kurulum yetkisi al
USER root

# Bizim hazırladığımız özel Late nodunu, doğrudan GitHub'dan kalıcı olarak kur
RUN npm install --prefix /usr/local/lib/node_modules/n8n git+https://github.com/tmrnvz/n8n-nodes-late.git

# Güvenlik için tekrar varsayılan 'node' kullanıcısına geri dön
USER node