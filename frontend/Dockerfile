FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Force copy of App files to ensure they're present (fixes Docker sync bug)
COPY src/App.js ./src/App.js
COPY src/index.js ./src/index.js

# Nettoyage du cache build uniquement
RUN rm -rf build

# Build the application
RUN npm run build

# Install serve to run the app
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"] 