FROM node

WORKDIR /usr/local/app

COPY . .

RUN npm i 

RUN npm i -D typescript

RUN npm i @prisma/client 

RUN npx prisma migrate deploy

RUN npx tsc

RUN npm run build

CMD ["npm", "run", "start:prod"]
