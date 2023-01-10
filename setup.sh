#!/bin/sh
cp /usr/src/app/config/.env /usr/src/app/.env
npx prisma generate
npm run dev
