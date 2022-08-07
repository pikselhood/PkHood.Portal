FROM node:latest

WORKDIR /app

RUN npm i ncp

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN git submodule update --init --recursive

RUN node copy-build-files.js

RUN npm install -g serve
#RUN npm install
#RUN npm run build

CMD [ "serve", "-s" , "build", "-l", "3000" ]

EXPOSE 3000
