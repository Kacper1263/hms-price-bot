# Use Node.js 20
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the bot source code to the working directory
COPY . .

CMD ["node", "app.js"]
