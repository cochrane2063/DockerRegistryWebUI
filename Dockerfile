# syntax=docker/dockerfile:1
FROM node:16.14.0
ENV NODE_ENV=production
WORKDIR /DockerRegistryWebUI
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
ARG REGISTRY_URL
ENV REACT_APP_REGISTRY_URL=$REGISTRY_URL
ENV GENERATE_SOURCEMAP false
RUN npm install
RUN chmod +x run
CMD ["/DockerRegistryWebUI/run"]
#CMD [ "npm", "run", "start-prod" ]
