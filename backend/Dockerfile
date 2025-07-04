# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Собираем TypeScript
COPY prisma ./prisma
COPY .env.production .env
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

# Step 2: Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Ставим только прод-зависимости
COPY package*.json ./
RUN npm install --omit=dev

# Копируем Prisma файлы (если есть)

# Копируем скомпилированный код
COPY --from=builder /app/dist ./dist

# Копируем node_modules
COPY --from=builder /app/node_modules ./node_modules

# Копируем любые другие нужные файлы (например, если у тебя есть статичные)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./.env 

# Открываем порт (ставь тот, который у тебя в main.ts: app.listen(PORT))
EXPOSE 3002

CMD ["node", "dist/main.js"]
