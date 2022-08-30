FROM node:16.13.2-alpine as react-build 

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN apk update && \
    apk add git
    
RUN npm install && \ 
    npm run build

FROM node:16.13.2-alpine

WORKDIR /app

COPY --from=react-build /app/build /app/build

RUN npm install -g serve

CMD [ "serve", "-s" , "build", "-l", "3000" ]

EXPOSE 3000
