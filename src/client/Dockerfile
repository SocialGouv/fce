FROM node:16-alpine as deps
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV REACT_APP_MAINTENANCE=false
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.25

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
