# client/Dockerfile
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Command to run the application
CMD ["serve", "-s", "build"]

# Expose the port
EXPOSE 3000
