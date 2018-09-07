MAINTAINER Morifeoluwa Jebutu <jebzmos4@gmail.com>

# Use node v10.8.0

FROM node:8.11.3

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 4000

# Launch application
CMD ["npm","run", "start"]