FROM node:8-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./src ./src

CMD [ "node ./index.js" ]

