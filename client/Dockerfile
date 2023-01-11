FROM node:16-alpine

WORKDIR /home/react/app
COPY package.json ./
COPY . .
RUN npm install
CMD [ "npm", "run", "dev" ]
