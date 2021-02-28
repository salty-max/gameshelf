FROM node:14-alpine

WORKDIR /usr/app

COPY ./package.json ./
COPY ./.npmrc ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]

EXPOSE 3000