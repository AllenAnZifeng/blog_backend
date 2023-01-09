FROM node:16
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install npm@latest -g
RUN npm install

# Bundle app source
COPY . .
RUN ["chmod", "+x", "/usr/src/app/setup.sh"]

# RUN npx prisma migrate dev --name init --schema=/usr/src/app/prisma/schema.prisma
# If you are building your code for production
# RUN npm ci --only=production



EXPOSE 4000
ENV NODE_ENV=production


# CMD [ "npm", "run","dev" ] # cannot start without .env, configured in CICD
