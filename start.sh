#!/bin/bash

# Startup script for running the application locally.
# Gets the Postgress URL from Heroku.

echo "Starting Employee Award Portal..."

url="$(./get_postgres_url.py)"
if [ $? -ne 0 ]; then
	echo -e "\n*****ERROR STARTING APPLICATION *****\n"
fi

echo "Using Postgres URL: $url"
export DATABASE_URL="$url"
mvn spring-boot:run

