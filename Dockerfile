FROM node:15

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# TODO optimize
RUN yarn
# install --production
# RUN yarn add typescript

COPY . .

COPY ./.env.production ./.env

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD ["node", "dist/index.js"]
USER node