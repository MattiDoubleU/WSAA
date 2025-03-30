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

# Get All Users.
@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
    conn.close()
    return jsonify(users)

# Get User by ID.
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
        user = cursor.fetchone()
    conn.close()
    return jsonify(user) if user else ('User not found', 404)

# Create User.
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (data['name'], data['email']))
        conn.commit()
    conn.close()
    return jsonify({'message': 'User created successfully'}), 201

# Update User.
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json
    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (data.get('name'), data.get('email'), id))
        conn.commit()
    conn.close()
    return jsonify({'message': 'User updated successfully'})

# Delete User.
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("DELETE FROM users WHERE id = %s", (id,))
        conn.commit()
    conn.close()
    return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)