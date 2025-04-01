from flask import Flask, request, jsonify
import pymysql
from config import config as cfg

app = Flask(__name__)

# Configure MySQL Database from config file.
DB_HOST = cfg.get('DB_HOST', 'localhost')
DB_USER = cfg.get('DB_USER', 'username')
DB_PASSWORD = cfg.get('DB_PASSWORD', 'password')
DB_NAME = cfg.get('DB_NAME', 'dbname')

def get_db_connection():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, cursorclass=pymysql.cursors.DictCursor)

# Routes for CRUD Operations.


if __name__ == '__main__':
    app.run(debug=True)