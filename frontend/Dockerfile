FROM node:16
WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]