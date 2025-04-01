from flask import Flask, request, jsonify
import pymysql
from config import config as cfg

app = Flask(__name__)

def get_db_connection():
    try:
        connection = pymysql.connect(
            host=cfg.get("db_host"),
            user=cfg.get("db_user"),
            password=cfg.get("db_password"),
            database=cfg.get("db_database"),
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except pymysql.MySQLError as err:
        return None

# Create expense.
@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM expenses")
        expenses = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(expenses)
    except pymysql.MySQLError as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
