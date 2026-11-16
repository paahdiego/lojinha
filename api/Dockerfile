FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

ENV PORT=3001
EXPOSE 3001
USER node

CMD ["node", "src/server.js"]
