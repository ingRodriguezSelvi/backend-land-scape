FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /land-scape
RUN apk add --update --no-cache
RUN apk add python3
RUN apk add make
RUN apk add g++
COPY . .
RUN npm install
RUN npm run tsc
RUN ls

FROM --platform=linux/amd64 node:16-alpine AS dependencies
WORKDIR /land-scape
RUN apk add --update --no-cache
RUN apk add python3
RUN apk add make
RUN apk add g++
COPY . .
RUN npm install --omit=dev
RUN ls

FROM --platform=linux/amd64 node:16-alpine3.16 as runtime
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /land-scape
RUN chown node:node .
USER node
COPY --from=builder ./land-scape/build .
COPY --from=dependencies ./land-scape/node_modules ./node_modules
EXPOSE 3000
RUN ls
ENTRYPOINT ["node", "src/app.js"]
