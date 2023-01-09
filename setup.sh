#!/bin/sh
cp config/.env .
npx prisma generate
npm run dev
