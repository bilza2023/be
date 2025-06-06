# Use official Node.js base
FROM node:18

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment
ENV NODE_ENV=production

# Start command
CMD ["node", "index.js"]
