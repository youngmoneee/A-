FROM node:18

WORKDIR /b_end

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
COPY package*.json .
RUN npm install && chmod +x wait-for-it.sh
COPY . .

CMD ["bash", "-c", "./wait-for-it.sh database:5432 -t 60 -- npx prisma db push && npx prisma generate && npm run build && npm run start:prod"]
