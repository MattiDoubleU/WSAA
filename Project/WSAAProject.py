from flask import Flask, request, jsonify
import mysql.connector
from config import config as cfg
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes by default

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
    
# Create.
@app.route('/api/expenses', methods=['POST'])
def add_expense():
    try:
        data = request.json
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO expenses (category, date, description, amount) VALUES (%s, %s, %s, %s)", 
                       (data['category'], data['date'], data['description'], data['amount']))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Expense added successfully!"}), 201
    except (KeyError, TypeError):
        return jsonify({"error": "Invalid JSON data"}), 400
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except RuntimeError as err:
        return jsonify({"error": str(err)}), 500

# Modify.    
@app.route('/api/expenses/<int:id>', methods=['GET'])
def get_expense(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, category, date, description, amount FROM expenses WHERE id = %s", (id,))
        expense = cursor.fetchone()
        cursor.close()
        connection.close()
        if expense:
            return jsonify(expense)
        else:
            return jsonify({"error": "Expense not found"}), 404
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except RuntimeError as err:
        return jsonify({"error": str(err)}), 500

# Update.
@app.route('/api/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    try:
        data = request.json
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("UPDATE expenses SET category=%s, date=%s, description=%s, amount=%s WHERE id=%s", 
                       (data['category'], data['date'], data['description'], data['amount'], id))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Expense updated successfully!"})
    except (KeyError, TypeError):
        return jsonify({"error": "Invalid JSON data"}), 400
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except RuntimeError as err:
        return jsonify({"error": str(err)}), 500

# Delete.
@app.route('/api/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM expenses WHERE id=%s", (id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Expense deleted successfully!"})
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except RuntimeError as err:
        return jsonify({"error": str(err)}), 500
    
@app.errorhandler(Exception)
def handle_exception(e):
    import traceback
    print("ERROR:", traceback.format_exc())
    return {"error": "Internal server error"}, 500


if __name__ == '__main__':
    app.run(debug=True)