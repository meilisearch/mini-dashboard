FROM node:20-alpine

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

USER node

COPY package*.json ./

COPY --chown=node:node . .
RUN yarn install

CMD ["yarn", "dev"]
