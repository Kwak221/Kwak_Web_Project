FROM node:16

WORKDIR /movieProject

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_API_URL http://localhost:3001

CMD ["npm", "start"]