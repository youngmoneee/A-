FROM node:18

WORKDIR /f_end

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
