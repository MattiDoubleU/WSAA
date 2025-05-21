function getAll(callback) {
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses", 
        "data": "", 
        "dataType": "JSON",
        "success": function(result) {
           
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error fetching all expenses: " + status + " msg:" + error);
        }
    });
}

// Modified to match the database schema: Category, Date, Description, Amount
function createExpense(expenseData, callback) {
    console.log("Creating expense: " + JSON.stringify(expenseData));
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses", 
        "data": JSON.stringify(expenseData),
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
          
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error creating expense: " + status + " msg:" + error);
        }
    });
}

// Modified to match the database schema: Transactionnumber (for ID), Category, Date, Description, Amount
function updateExpense(Expense, callback) {
    console.log("Updating expense: " + JSON.stringify(Expense));
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses/" + encodeURI(Expense.Transactionnumber), // Use Transactionnumber for ID in URL
        "method": "PUT",
        "data": JSON.stringify(Expense),
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
            console.log("Update successful:", result);
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error updating expense: " + status + " msg:" + error);
        }
    });
}

// Function to delete an expense by ID
function deleteExpense(id, callback) {
    console.log("Deleting expense with ID: " + id);
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses/" + id, // 'id' here refers to Transactionnumber
        "method": "DELETE",
        "data": "", 
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
            console.log("Delete successful:", result);
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error deleting expense: " + status + " msg:" + error);
        }
    });
}

// testing code

// Callback function for getAll
// Modified to match the database schema fields
function processGetAllResponse(result) {
    console.log("Processing all expenses response:");
    if (Array.isArray(result)) {
        for (let expense of result) { 
            let displayExpense = {}; 
            displayExpense.Transactionnumber = expense.Transactionnumber;
            displayExpense.Category = expense.Category;
            displayExpense.Date = expense.Date;
            displayExpense.Description = expense.Description;
            displayExpense.Amount = expense.Amount;

            console.log(displayExpense);
        }
    } else {
        console.log("Expected an array of expenses, but received:", result);
    }
}

// Callback function for createExpense
function processCreateResponse(result) {
    console.log("Processing create expense response:");
    console.log(result);
}

// Callback function for updateExpense
function processUpdateResponse(result) {
    console.log("Processing update expense response:");
    console.log(result);
}

// Callback function for deleteExpense
function processDeleteResponse(result) {
    console.log("Processing delete expense response:");
    console.log(result);
}
