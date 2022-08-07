FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install -g serve
#RUN npm install
#RUN npm run build

CMD [ "serve", "-s" , "build", "-l", "3000" ]

EXPOSE 3000
