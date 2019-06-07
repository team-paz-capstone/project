#!/bin/bash

set -euo pipefail # http://redsymbol.net/articles/unofficial-bash-strict-mode/
IFS=$'\n\t'

true=1
false=0

DEVELOPMENT_MAX_CONNECTIONS=2
PRODUCTION_MAX_CONNECTIONS=5

function main() {
    get_heroku_env_variables
    load_jdbc_variable
    set_max_connections $@
    start_server
}

function get_heroku_env_variables() {
    echo "Getting config variables!"
    CONFIG_VARS=$(heroku config -a pazcapstone)

    SKIP_FIRST=${false}
    for VAR in ${CONFIG_VARS}; do
        if [[ ${SKIP_FIRST} -eq ${false} ]]; then
            SKIP_FIRST=${true}
        else
            set_env_variable_in_bash_session ${VAR}
        fi
    done
}

function set_env_variable_in_bash_session() {
    for VAR in ${@}; do
        name=$(echo ${VAR} | awk '{print substr($1, 1, length($1)-1)}')
        value=$(echo ${VAR} | awk '{print $2}')
        prepared_export=${name}'='${value}
        export ${prepared_export}
    done
}

function load_jdbc_variable() {
    echo "Getting JDBC_DATABASE_URL!"
    JDBC=$(heroku run echo '$JDBC_DATABASE_URL' -a pazcapstone)
    prepared_export=JDBC_DATABASE_URL'='${JDBC}
    export ${prepared_export}
}

function set_max_connections() {
    max_connections=${DEVELOPMENT_MAX_CONNECTIONS}

    # if DYNO variable is set, it means environment is production
    if [ -n "${DYNO+1}" ]; then
        echo "In production environment, set max database connection to $PRODUCTION_MAX_CONNECTIONS"
        max_connections=${PRODUCTION_MAX_CONNECTIONS}

    # if DYNO variable is unset, it means environment is local as only heroku dyno has DYNO env variable
    else
        echo "In local dev environment, set max database connection to $DEVELOPMENT_MAX_CONNECTIONS"
        max_connections=${DEVELOPMENT_MAX_CONNECTIONS}
    fi;

    export MAX_CONNECTIONS=${max_connections}
}

function start_server() {
    echo "Starting server!"
    mvn spring-boot:run
}

main $@
