FROM node:18

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["bash", "-c", "npx prisma db push && npx prisma generate && npm run start:dev"]
