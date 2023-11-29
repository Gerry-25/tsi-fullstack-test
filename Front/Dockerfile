# Use an official Node.js runtime as a parent image
FROM node:20 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image for serving the React app
FROM nginx:alpine

# Copy the build files from the builder stage to the nginx web root
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 3000

# Command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]

