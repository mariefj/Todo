FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build
RUN pnpm prune --prod

EXPOSE 3000

CMD ["node", "dist/index.js"]