function getAll(callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses",
        method: "GET",
        dataType: "json",
        success: function(result) {
            callback(result);
        },
        error: function(xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function createExpense(expense, callback) {
    console.log("Creating:", JSON.stringify(expense));
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses",
        method: "POST",
        data: JSON.stringify(expense),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            callback(result);
        },
        error: function(xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function updateExpense(expense, callback) {
    console.log("Updating:", JSON.stringify(expense));
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses/" + encodeURIComponent(expense.id),
        method: "PUT",
        data: JSON.stringify(expense),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            callback(result);
        },
        error: function(xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function deleteExpense(id, callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses/" + encodeURIComponent(id),
        method: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            callback(result);
        },
        error: function(xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

// Test Response Handlers
function processGetAllResponse(result) {
    console.log("All expenses:");
    for (let expense of result) {
        console.log({
            id: expense.id,
            category: expense.category,
            date: expense.date,
            description: expense.description,
            amount: expense.amount
        });
    }
}

function processCreateResponse(result) {
    console.log("Created:", result);
}

function processUpdateResponse(result) {
    console.log("Updated:", result);
}

function processDeleteResponse(result) {
    console.log("Deleted:", result);
}

// Example Usage
getAll(processGetAllResponse);

