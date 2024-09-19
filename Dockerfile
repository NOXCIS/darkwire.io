# Stage 1: Build Stage
FROM node:current-alpine AS builder

WORKDIR /opt/app
COPY  . .

RUN apk update \
        && apk add --no-cache bash \
        && chmod +x /opt/app/start.sh \
        && npm install -g yarn@latest --force \
        && yarn install --flat --production --no-cache \
        && yarn build --no-cache \
        && rm -rf /opt/app/node_modules \
        && rm -rf /opt/app/server/node_modules \
        && yarn cache clean \
        && yarn autoclean --force

# Stage 2: Production Stage
FROM alpine:latest

WORKDIR /opt/app

COPY --from=builder /opt/app/client/dist /opt/app/client/dist
COPY --from=builder /opt/app/server /opt/app/server
COPY package.json /opt/app/package.json
COPY default.conf /etc/nginx/http.d/
COPY start.sh /opt/app/start.sh




RUN apk add --no-cache nginx yarn openssl && \
    chmod +x /opt/app/start.sh



HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \ 
    CMD [ "curl", "-f", "http://localhost:3001", "||", "exit", "1" ]

CMD ["/opt/app/start.sh"]

STOPSIGNAL SIGTERM