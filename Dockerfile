# syntax=docker/dockerfile:1
FROM node:16.14.0
ENV NODE_ENV=production
WORKDIR /DockerRegistryWebUI
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
ENV GENERATE_SOURCEMAP false
RUN npm install
CMD [ "npm", "run", "start-prod" ]
