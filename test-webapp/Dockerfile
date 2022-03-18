FROM node:alpine

WORKDIR /usr/src/app/test-webapp

# Wildcard used to copy to container "package.json" AND "package-lock.json"
COPY ./package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .

CMD ["npm","start"]
