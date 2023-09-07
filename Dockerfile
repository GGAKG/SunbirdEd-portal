# Dockerfile for the player setup
FROM node:14.19.0-slim
RUN useradd -u 1001 -md /home/sunbird sunbird
WORKDIR /home/sunbird
COPY --chown=sunbird . /home/sunbird/app_dist/
USER sunbird
WORKDIR /home/sunbird/app_dist
EXPOSE 3000
RUN cd src/app && yarn install && cd client && yarn install && cd /home/sunbird/app_dist
CMD ["node", "server.js", "&"]
