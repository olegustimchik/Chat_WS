FROM node:20

WORKDIR /project

COPY package*.json .

COPY .env .

RUN npm install 

COPY . .

CMD [ "node" ]