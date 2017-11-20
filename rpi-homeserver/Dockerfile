FROM node:8-alpine as builder

WORKDIR /build
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install


FROM node:8-alpine

LABEL Author Zenobius Jiricek <airtonix@users.noreply.github.com>

RUN apk add --update \
    && rm -rf /var/cache/apk/*

WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules/
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
    && mkdir /entrypoint.d/

ENTRYPOINT [ "/entrypoint.sh" ]