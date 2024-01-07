FROM node:18-alpine AS web-build
WORKDIR /app
COPY . ./Ecommerce-Frontend/
RUN cd Ecommerce-Frontend && npm install --force && npm run build

FROM nginx:latest
COPY --from=web-build /app/Ecommerce-Frontend/build/ /usr/share/nginx/html
EXPOSE 80