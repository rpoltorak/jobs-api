# Build stage
FROM node:14 as builder

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Run stage
FROM node:14
WORKDIR /usr/app

COPY package*.json .

RUN npm install --production

ENV APP_DIR=/usr/app

COPY --from=builder $APP_DIR/build .
COPY --from=builder $APP_DIR/.env .
COPY --from=builder $APP_DIR/ormconfig.js .
COPY --from=builder $APP_DIR/scripts/wait-for-it.sh .

RUN ["chmod", "+x", "wait-for-it.sh"]

EXPOSE 4000
CMD [ "node", "index.js" ]
