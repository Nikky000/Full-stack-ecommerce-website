FROM node:18-alpine
WORKDIR /app
COPY . ./Ecommerce-Backend/
RUN cd Ecommerce-Backend && npm install
CMD ["/bin/sh", "-c", "cd /app/Ecommerce-Backend/ && npm start"]