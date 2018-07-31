FROM mongo:3.6.4

COPY causes.json /causes.json
CMD mongoimport --host mongodb:27017 --db gotribute --collection causes --type json --file /causes.json --jsonArray
