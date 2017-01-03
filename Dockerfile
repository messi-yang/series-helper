FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
