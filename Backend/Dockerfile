ARG NODE_VERSION=22.18.0
ARG PORT=4000

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY Backend/package*.json ./

RUN npm install


# # Run the application as a non-root user.
# USER node

# Copy the rest of the source files into the image.
COPY Backend .

# # Expose the port that the application listens on.
EXPOSE ${PORT}

# Run the application.
CMD ["npm","run","dev"]