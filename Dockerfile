FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm i ncp
RUN node copy-build-files.js

RUN npm install -g serve
#RUN npm install
#RUN npm run build

CMD [ "serve", "-s" , "build", "-l", "3000" ]

EXPOSE 3000
