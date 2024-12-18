# Use Node.js image
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy the rest of the backend files into the container (but not the .env file due to .dockerignore)
COPY ./backend ./

# Expose port 5000 (or any custom port)
EXPOSE 5000

# Command to run the app
CMD ["node", "server.js"]
