FROM node:16.13.2-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

# RUN apk update && \
#     apk add git
    
# RUN npm install -g serve && \
#     npm install && \ 
#     npm run build

RUN npm install -g serve

CMD [ "serve", "-s" , "build", "-l", "3000" ]

EXPOSE 3000
