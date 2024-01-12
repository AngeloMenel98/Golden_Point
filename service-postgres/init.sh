#!/bin/bash

set -e

psql -v --username "$POSTGRES_USER" <<-EOSQL
    CREATE ROLE postgres;
    ALTER ROLE postgres WITH LOGIN;
    CREATE DATABASE padel_app;
    GRANT ALL PRIVILEGES ON DATABASE padel_app TO postgres;
EOSQL

