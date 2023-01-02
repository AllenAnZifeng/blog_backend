Initialize and migrate database
```bash
prisma migrate dev --name [init]
```

Docker
```bash
docker build . --no-cache -t imballen/node-web-app
docker run -p 4000:4000 -d imballen/node-web-app
```

Github Actions --- Build and push to Docker Hub

Need to add .env file
Local database
```
DATABASE_URL="file:./dev.db"
```
Remote MySQL
```
DATABASE_URL="mysql://username:password@HOST:3306/databaseName"
```
