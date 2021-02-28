FROM node:14-alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN yarn

COPY ./ ./

CMD ["yarn", "start"]

EXPOSE 8080