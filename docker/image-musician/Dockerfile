FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY app/ /usr/src/app/

RUN npm install --save uuid dgram

ENTRYPOINT [ "nodejs", "musician.js" ]