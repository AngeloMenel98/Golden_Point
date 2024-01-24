#!/bin/bash

set -e

psql -v --username "$POSTGRES_USER" <<-EOSQL
    CREATE ROLE postgres;
    ALTER ROLE postgres WITH LOGIN;
    CREATE DATABASE golden_point;
    GRANT ALL PRIVILEGES ON DATABASE golden_point TO postgres;
EOSQL

