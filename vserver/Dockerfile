FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# Add sentry:sourcemaps
# Add SENTRY_AUTH_TOKEN to .env

EXPOSE 3000

CMD ["node", "--max-old-space-size=1500", "dist/main.js"]
