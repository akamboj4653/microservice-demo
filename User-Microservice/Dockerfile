FROM node:20

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the source code
COPY . .

# Build (if you’re using NestJS build step)
RUN npm run build

CMD ["npm", "run", "start:prod"]
