#!/bin/sh
cp /usr/src/app/config/.env /usr/src/app
npx prisma generate
npm run dev
