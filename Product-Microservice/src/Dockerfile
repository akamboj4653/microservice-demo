# Stage 1: Build the application
FROM node:20.15.0-alpine AS build
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
# Install all dependencies (including devDependencies) for building
RUN npm ci --silent

# Copy source code and build
COPY . .
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# Stage 2: Create a lightweight production image  
FROM node:20.15.0-alpine AS production
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S microservice -u 1001

# Copy built application and dependencies
COPY --from=build --chown=microservice:nodejs /app/dist ./dist
COPY --from=build --chown=microservice:nodejs /app/node_modules ./node_modules
COPY --chown=microservice:nodejs package*.json ./

# Switch to non-root user
USER microservice

# Expose the correct port
EXPOSE 8000

# Health check for NestJS application
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1

# Start the application
CMD ["node", "dist/main.js"]