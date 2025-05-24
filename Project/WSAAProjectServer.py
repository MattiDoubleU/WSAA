from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from ExpenseDAO import expenseDAO  

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes.

@app.route('/')
@cross_origin()
def index():
    return "Hello, World!"

# Get all expenses.
@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    try:
        return jsonify(expenseDAO.getAll())
    except Exception as err:
        return jsonify({"error": str(err)}), 500

# Create a new expense.
@app.route('/api/expenses', methods=['POST'])
def add_expense():
    try:
        data = request.json
        print("Received POST data:", data)
        required_keys = {'Category', 'Date', 'Description', 'Amount'}
        if not required_keys.issubset(data):
            return jsonify({"error": "Missing required fields"}), 400

        expense = {
            "Category": data["Category"],
            "Date": data["Date"],
            "Description": data["Description"],
            "Amount": data["Amount"]
        }
        saved_expense = expenseDAO.create(expense)
        return jsonify(saved_expense), 201
    except Exception as err:
        return jsonify({"error": str(err)}), 500

# Get expense by ID.
@app.route('/api/expenses/<int:id>', methods=['GET'])
def get_expense(id):
    try:
        result = expenseDAO.findByID(id)
        if result:
            return jsonify(result)
        else:
            return jsonify({"error": "Expense not found"}), 404
    except Exception as err:
        return jsonify({"error": str(err)}), 500

# Update an expense.
@app.route('/api/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    try:
        data = request.json
        required_keys = {'Category', 'Date', 'Description', 'Amount'}
        if not required_keys.issubset(data):
            return jsonify({"error": "Missing required fields"}), 400
        expenseDAO.update(id, data)
        return jsonify({"message": "Expense updated successfully!"})
    except Exception as err:
        return jsonify({"error": str(err)}), 500

# Delete an expense.
@app.route('/api/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    try:
        expenseDAO.delete(id)
        return jsonify({"message": "Expense deleted successfully!"})
    except Exception as err:
        return jsonify({"error": str(err)}), 500

# Global error handler.
@app.errorhandler(Exception)
def handle_exception(e):
    import traceback
    print("ERROR:", traceback.format_exc())
    return {"error": "Internal server error"}, 500

if __name__ == '__main__':
    app.run(debug=True)