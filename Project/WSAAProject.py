from flask import Flask, request, jsonify
import mysql.connector
from config import config as cfg

app = Flask(__name__)

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=cfg.get("db_host"),
            user=cfg.get("db_user"),
            password=cfg.get("db_password"),
            database=cfg.get("db_database")
        )
        return connection
    except mysql.connector.Error as err:
        raise RuntimeError(f"Database connection failed: {err}")

# Get.
@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM expenses")
        expenses = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(expenses)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except RuntimeError as err:
        return jsonify({"error": str(err)}), 500


if __name__ == '__main__':
    app.run(debug=True)