FROM cypress/base:12.16.1
USER root
WORKDIR /home/yev/Documents/Work/automatisation_cypress_test
COPY . .

RUN npm install
RUN npx cypress install
RUN npx cypress run
