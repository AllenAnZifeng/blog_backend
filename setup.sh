#!/bin/sh
cp /usr/src/app/config/.env .
npx prisma generate
npm run dev
