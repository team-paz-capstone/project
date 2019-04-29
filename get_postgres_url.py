#!/usr/bin/env python

"""
Utility script for starting the application locally. Determines the appropriate Postgress URL 
from Heroku, and exports it as an environment variable before starting the application.
"""
import os
import re
import subprocess
import traceback

APP_NAME = "pazcapstone"

def export_database_url():
    heroku_output = subprocess.check_output("heroku config -a {} | grep DATABASE_URL".format(APP_NAME), shell=True)
    try:
        url = re.search("postgres://(.*)$", heroku_output).group()
        # print("Exporting Postgres URL: " + url)
        # Export variable.
        print(url)

    except Exception:
	print("***** error parsing Postgres URL: *****")
        print(traceback.format_exc())
        exit(1)

if __name__ == "__main__":
    export_database_url()
