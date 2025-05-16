# Use an official Node runtime as a parent image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Set environment variables (via Render dashboard later)

# Expose port (match the port your app uses, usually 3000 or 8080)
EXPOSE 8080

# Command to run your app
CMD ["node", "server.js"]
