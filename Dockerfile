FROM node:16-alpine3.12

WORKDIR /sewing-control-be

COPY . .

RUN npm i
# RUN npm i nodemon ts-node typescript -g

EXPOSE 3000

CMD ["node","./dist/index.js"]