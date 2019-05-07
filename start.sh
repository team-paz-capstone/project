#!/bin/bash

# Startup script for running the application locally.
# Gets the Postgress URL from Heroku.

echo "Starting Employee Award Portal..."

echo "*****You must manually export the JDBC_DATABASE_URL parameter for now*****"
echo "Execute the command: 'heroku run echo\$JDBC_DATABASE_URL' to view it"

echo "Then, after exporting JDBC_DATABASE_URL, execute 'mvn spring-boot:run'"

#url="$(./get_postgres_url.py)"
#if [ $? -ne 0 ]; then
#	echo -e "\n*****ERROR STARTING APPLICATION *****\n"
#fi
#
#echo "Using Postgres URL: $url"
#export DATABASE_URL="$url"
#mvn spring-boot:run

