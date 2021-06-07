FROM cypress/browsers:node12.14.1-chrome85-ff81

RUN npm install
RUN npm run smoke
