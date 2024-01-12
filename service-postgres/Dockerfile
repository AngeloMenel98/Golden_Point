FROM postgres:15.2-alpine3.17 
ADD init.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init.sh
