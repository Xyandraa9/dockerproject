FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 8080
CMD ["node", "app.js"]