# FROM Node
FROM node:16

#Work Directory
WORKDIR /movieProject

#Copying JSON File
COPY package*.json ./
COPY public/ /movieProject/

#Run CMD
RUN npm install

#COPY
COPY . .

#Exposing the Port
EXPOSE 3000

#Environment
ENV REACT_APP_API_URL http://localhost:3001

#Commands
CMD ["npm", "start"]