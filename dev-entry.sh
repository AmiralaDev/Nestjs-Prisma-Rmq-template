#!/bin/bash
npm run prisma:migrate:dev
npm run prisma:seed
#npm run start:dev
npm run build
npm run pm2:prod