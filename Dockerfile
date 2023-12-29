# Stage 1: Build Stage
FROM node:alpine3.19 AS builder

WORKDIR /home/node
COPY --chown=node:node . .

RUN apk update \
        && apk add --no-cache bash \
        && chmod +x /home/node/start.sh \
        && npm install -g yarn@latest --force \
        && yarn upgrade --no-cache \
        && yarn build --no-cache 


# Stage 2: Production Stage
FROM node:alpine3.19

WORKDIR /home/node
COPY --from=builder /home/node .

RUN apk add --no-cache nginx openssl && \
    rm /etc/nginx/http.d/default.conf && \
    mv /home/node/default.conf /etc/nginx/http.d/ && \
    chmod +x /home/node/start.sh

STOPSIGNAL SIGINT
CMD ["/home/node/start.sh"]
