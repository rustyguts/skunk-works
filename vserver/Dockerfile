FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "--max-old-space-size=1500", "dist/main.js"]
