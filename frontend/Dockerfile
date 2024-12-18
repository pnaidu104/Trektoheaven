# Use official Nginx image
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files into the nginx container
COPY ./frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80
