FROM node:8-alpine as builder

WORKDIR /build
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install


FROM node:8-alpine

LABEL Author Zenobius Jiricek <airtonix@users.noreply.github.com>

WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules/
COPY ./src ./src

CMD [ "node ./index.js" ]

