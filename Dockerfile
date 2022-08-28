###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts As development

RUN apt-get update && apt-get install -y openssl

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm install pm2 --location=global

COPY --chown=node:node . .

RUN npm run prisma:generate

COPY dev-entry.sh .

ENTRYPOINT ["bash" , "dev-entry.sh"]
