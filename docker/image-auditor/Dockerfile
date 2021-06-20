FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY src/ /usr/src/app/

RUN npm install --save moment dgram net

ENTRYPOINT [ "nodejs", "auditor.js" ]